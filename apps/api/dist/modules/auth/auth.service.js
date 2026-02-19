"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const auth_repository_1 = require("./auth.repository");
const auth_crypto_1 = require("./auth.crypto");
const auth_messages_1 = require("./auth.messages");
let AuthService = class AuthService {
    constructor(repository) {
        this.repository = repository;
        const maxAttempts = Number(process.env.AUTH_MAX_LOGIN_ATTEMPTS);
        const lockMinutes = Number(process.env.AUTH_LOCK_MINUTES);
        const jwtSecret = process.env.JWT_SECRET ?? 'change-me';
        const tokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN ?? '1h';
        this.maxAttempts = Number.isFinite(maxAttempts) && maxAttempts > 0 ? maxAttempts : 5;
        this.lockMinutes = Number.isFinite(lockMinutes) && lockMinutes > 0 ? lockMinutes : 15;
        this.jwtSecret = jwtSecret;
        this.tokenExpiresIn = tokenExpiresIn;
    }
    async register(payload, acceptLanguage) {
        const locale = (0, auth_messages_1.resolveLocale)(acceptLanguage);
        const email = payload.email.trim().toLowerCase();
        const existingUser = await this.repository.findUserByEmail(email);
        if (existingUser) {
            throw new common_1.BadRequestException({ message: (0, auth_messages_1.t)(locale, 'userExists') });
        }
        const { hash, salt } = await (0, auth_crypto_1.hashPassword)(payload.password);
        const user = await this.repository.createUser({
            email,
            passwordHash: hash,
            passwordSalt: salt,
        });
        return {
            ok: true,
            message: (0, auth_messages_1.t)(locale, 'registered'),
            userId: user.id,
        };
    }
    async login(payload, context) {
        const locale = (0, auth_messages_1.resolveLocale)(context.acceptLanguage);
        const email = payload.email.trim().toLowerCase();
        const user = await this.repository.findUserByEmail(email);
        if (!user) {
            await this.repository.recordLoginAttempt({
                email,
                status: client_1.LoginAttemptStatus.FAILED,
                ip: context.ip,
                userAgent: context.userAgent,
            });
            throw new common_1.UnauthorizedException({ message: (0, auth_messages_1.t)(locale, 'invalidCredentials') });
        }
        const now = new Date();
        if (user.lockedUntil && user.lockedUntil > now) {
            await this.repository.recordLoginAttempt({
                email,
                status: client_1.LoginAttemptStatus.BLOCKED,
                ip: context.ip,
                userAgent: context.userAgent,
                user: { connect: { id: user.id } },
            });
            throw new common_1.HttpException({ message: (0, auth_messages_1.t)(locale, 'locked'), lockedUntil: user.lockedUntil }, common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        if (user.lockedUntil && user.lockedUntil <= now) {
            await this.repository.updateUserAuthState(user.id, {
                lockedUntil: null,
                failedAttempts: 0,
            });
            user.lockedUntil = null;
            user.failedAttempts = 0;
        }
        const passwordValid = await (0, auth_crypto_1.verifyPassword)(payload.password, user.passwordSalt, user.passwordHash);
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
                status: client_1.LoginAttemptStatus.FAILED,
                ip: context.ip,
                userAgent: context.userAgent,
                user: { connect: { id: user.id } },
            });
            if (shouldLock) {
                await this.repository.recordLoginAlert({
                    email,
                    type: client_1.LoginAlertType.LOCKOUT,
                    message: `Locked for ${this.lockMinutes} minutes after more than ${this.maxAttempts} failed attempts.`,
                    user: { connect: { id: user.id } },
                });
                throw new common_1.HttpException({ message: (0, auth_messages_1.t)(locale, 'locked'), lockedUntil }, common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            throw new common_1.UnauthorizedException({ message: (0, auth_messages_1.t)(locale, 'invalidCredentials') });
        }
        await this.repository.updateUserAuthState(user.id, {
            failedAttempts: 0,
            lockedUntil: null,
            lastLoginAt: now,
        });
        await this.repository.recordLoginAttempt({
            email,
            status: client_1.LoginAttemptStatus.SUCCESS,
            ip: context.ip,
            userAgent: context.userAgent,
            user: { connect: { id: user.id } },
        });
        const accessToken = (0, jsonwebtoken_1.sign)({ sub: user.id, email: user.email }, this.jwtSecret, {
            expiresIn: this.tokenExpiresIn,
        });
        return {
            ok: true,
            message: (0, auth_messages_1.t)(locale, 'loggedIn'),
            accessToken,
            tokenType: 'Bearer',
            userId: user.id,
        };
    }
    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60 * 1000);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map