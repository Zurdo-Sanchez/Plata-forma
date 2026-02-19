import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, type SignOptions } from 'jsonwebtoken';
import { LoginAlertType, LoginAttemptStatus } from '@prisma/client';
import { AuthRepository } from './auth.repository';
import { hashPassword, verifyPassword } from './auth.crypto';
import { LoginDto, RegisterDto } from './auth.schemas';
import { resolveLocale, t } from './auth.messages';

export interface LoginContext {
  ip?: string;
  userAgent?: string;
  acceptLanguage?: string;
}

@Injectable()
export class AuthService {
  private readonly maxAttempts: number;
  private readonly lockMinutes: number;
  private readonly jwtSecret: string;
  private readonly tokenExpiresIn: SignOptions['expiresIn'];

  constructor(private readonly repository: AuthRepository) {
    const maxAttempts = Number(process.env.AUTH_MAX_LOGIN_ATTEMPTS);
    const lockMinutes = Number(process.env.AUTH_LOCK_MINUTES);
    const jwtSecret = process.env.JWT_SECRET ?? 'change-me';
    const tokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN ?? '1h';

    this.maxAttempts = Number.isFinite(maxAttempts) && maxAttempts > 0 ? maxAttempts : 5;
    this.lockMinutes = Number.isFinite(lockMinutes) && lockMinutes > 0 ? lockMinutes : 15;
    this.jwtSecret = jwtSecret;
    this.tokenExpiresIn = tokenExpiresIn as SignOptions['expiresIn'];
  }

  async register(payload: RegisterDto, acceptLanguage?: string) {
    const locale = resolveLocale(acceptLanguage);
    const email = payload.email.trim().toLowerCase();

    const existingUser = await this.repository.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException({ message: t(locale, 'userExists') });
    }

    const { hash, salt } = await hashPassword(payload.password);
    const user = await this.repository.createUser({
      email,
      passwordHash: hash,
      passwordSalt: salt,
    });

    return {
      ok: true,
      message: t(locale, 'registered'),
      userId: user.id,
    };
  }

  async login(payload: LoginDto, context: LoginContext) {
    const locale = resolveLocale(context.acceptLanguage);
    const email = payload.email.trim().toLowerCase();
    const user = await this.repository.findUserByEmail(email);

    if (!user) {
      await this.repository.recordLoginAttempt({
        email,
        status: LoginAttemptStatus.FAILED,
        ip: context.ip,
        userAgent: context.userAgent,
      });
      throw new UnauthorizedException({ message: t(locale, 'invalidCredentials') });
    }

    const now = new Date();

    if (user.lockedUntil && user.lockedUntil > now) {
      await this.repository.recordLoginAttempt({
        email,
        status: LoginAttemptStatus.BLOCKED,
        ip: context.ip,
        userAgent: context.userAgent,
        user: { connect: { id: user.id } },
      });
      throw new HttpException(
        { message: t(locale, 'locked'), lockedUntil: user.lockedUntil },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    if (user.lockedUntil && user.lockedUntil <= now) {
      await this.repository.updateUserAuthState(user.id, {
        lockedUntil: null,
        failedAttempts: 0,
      });
      user.lockedUntil = null;
      user.failedAttempts = 0;
    }

    const passwordValid = await verifyPassword(payload.password, user.passwordSalt, user.passwordHash);
    if (!passwordValid) {
      const failedAttempts = user.failedAttempts + 1;
      const shouldLock = failedAttempts > this.maxAttempts;
      const lockedUntil = shouldLock ? this.addMinutes(now, this.lockMinutes) : null;

      await this.repository.updateUserAuthState(user.id, {
        failedAttempts: shouldLock ? 0 : failedAttempts,
        lockedUntil,
      });

      await this.repository.recordLoginAttempt({
        email,
        status: LoginAttemptStatus.FAILED,
        ip: context.ip,
        userAgent: context.userAgent,
        user: { connect: { id: user.id } },
      });

      if (shouldLock) {
        await this.repository.recordLoginAlert({
          email,
          type: LoginAlertType.LOCKOUT,
          message: `Locked for ${this.lockMinutes} minutes after more than ${this.maxAttempts} failed attempts.`,
          user: { connect: { id: user.id } },
        });

        throw new HttpException({ message: t(locale, 'locked'), lockedUntil }, HttpStatus.TOO_MANY_REQUESTS);
      }

      throw new UnauthorizedException({ message: t(locale, 'invalidCredentials') });
    }

    await this.repository.updateUserAuthState(user.id, {
      failedAttempts: 0,
      lockedUntil: null,
      lastLoginAt: now,
    });

    await this.repository.recordLoginAttempt({
      email,
      status: LoginAttemptStatus.SUCCESS,
      ip: context.ip,
      userAgent: context.userAgent,
      user: { connect: { id: user.id } },
    });

    const accessToken = sign({ sub: user.id, email: user.email }, this.jwtSecret, {
      expiresIn: this.tokenExpiresIn,
    });

    return {
      ok: true,
      message: t(locale, 'loggedIn'),
      accessToken,
      tokenType: 'Bearer',
      userId: user.id,
    };
  }

  private addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60 * 1000);
  }
}
