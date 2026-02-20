"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const i18n_1 = require("../../i18n");
const auth_messages_1 = require("./auth.messages");
let AuthGuard = class AuthGuard {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET ?? 'change-me';
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const acceptLanguage = request.get('accept-language');
        const locale = (0, i18n_1.resolveLocale)(acceptLanguage);
        const header = request.get('authorization');
        const token = typeof header === 'string' && header.startsWith('Bearer ') ? header.slice(7) : null;
        if (!token) {
            throw new common_1.UnauthorizedException({ message: (0, auth_messages_1.t)(locale, 'unauthorized') });
        }
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, this.jwtSecret);
            if (!payload?.sub) {
                throw new Error('invalid');
            }
            request.user = { id: String(payload.sub), email: payload.email };
            return true;
        }
        catch {
            throw new common_1.UnauthorizedException({ message: (0, auth_messages_1.t)(locale, 'unauthorized') });
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map