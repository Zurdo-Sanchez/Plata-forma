import { AuthRepository } from './auth.repository';
import { LoginDto, RegisterDto } from './auth.schemas';
export interface LoginContext {
    ip?: string;
    userAgent?: string;
    acceptLanguage?: string;
}
export declare class AuthService {
    private readonly repository;
    private readonly maxAttempts;
    private readonly lockMinutes;
    private readonly jwtSecret;
    private readonly tokenExpiresIn;
    constructor(repository: AuthRepository);
    register(payload: RegisterDto, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        userId: string;
    }>;
    login(payload: LoginDto, context: LoginContext): Promise<{
        ok: boolean;
        message: string;
        accessToken: string;
        tokenType: string;
        userId: string;
    }>;
    private addMinutes;
}
