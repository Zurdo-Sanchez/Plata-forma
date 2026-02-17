import { Request } from 'express';
import { AuthService } from './auth.service';
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
        accessToken: never;
        tokenType: string;
        userId: string;
    }>;
}
