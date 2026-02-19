import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthRequest } from './auth.guard';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        userId: string;
    }>;
    login(body: unknown, acceptLanguage: string | undefined, request: Request): Promise<{
        ok: boolean;
        message: string;
        accessToken: string;
        tokenType: string;
        userId: string;
    }>;
    me(request: AuthRequest): Promise<{
        ok: boolean;
        user: import("./auth.guard").AuthUser | undefined;
    }>;
}
