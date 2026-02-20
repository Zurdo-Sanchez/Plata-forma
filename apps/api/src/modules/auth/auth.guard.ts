import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import { resolveLocale } from '../../i18n';
import { t } from './auth.messages';

export interface AuthUser {
  id: string;
  email?: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret = process.env.JWT_SECRET ?? 'change-me';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const acceptLanguage = request.get('accept-language');
    const locale = resolveLocale(acceptLanguage);
    const header = request.get('authorization');
    const token = typeof header === 'string' && header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      throw new UnauthorizedException({ message: t(locale, 'unauthorized') });
    }

    try {
      const payload = verify(token, this.jwtSecret) as { sub?: string | number; email?: string };
      if (!payload?.sub) {
        throw new Error('invalid');
      }
      request.user = { id: String(payload.sub), email: payload.email };
      return true;
    } catch {
      throw new UnauthorizedException({ message: t(locale, 'unauthorized') });
    }
  }
}
