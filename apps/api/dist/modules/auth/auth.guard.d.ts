import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
export interface AuthUser {
    id: string;
    email?: string;
}
export interface AuthRequest extends Request {
    user?: AuthUser;
}
export declare class AuthGuard implements CanActivate {
    private readonly jwtSecret;
    canActivate(context: ExecutionContext): boolean;
}
