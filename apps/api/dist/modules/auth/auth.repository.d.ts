import { AuthLoginAlert, AuthLoginAttempt, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findUserByEmail(email: string): Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        passwordHash: string;
        passwordSalt: string;
        isSuperAdmin: boolean;
        failedAttempts: number;
        lockedUntil: Date | null;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    createUser(data: Prisma.UserCreateInput): Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        passwordHash: string;
        passwordSalt: string;
        isSuperAdmin: boolean;
        failedAttempts: number;
        lockedUntil: Date | null;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateUserAuthState(userId: string, data: Prisma.UserUpdateInput): Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        passwordHash: string;
        passwordSalt: string;
        isSuperAdmin: boolean;
        failedAttempts: number;
        lockedUntil: Date | null;
        lastLoginAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    recordLoginAttempt(data: Prisma.AuthLoginAttemptCreateInput): Promise<AuthLoginAttempt>;
    recordLoginAlert(data: Prisma.AuthLoginAlertCreateInput): Promise<AuthLoginAlert>;
}
