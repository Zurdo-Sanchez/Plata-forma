import { AuthRequest } from '../auth/auth.guard';
import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.AccountType;
        isActive: boolean;
    }[]>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: {
            id: string;
            name: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            type: import(".prisma/client").$Enums.AccountType;
            isActive: boolean;
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        id: string;
        name: string;
        currency: string | null;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        type: import(".prisma/client").$Enums.AccountType;
        isActive: boolean;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: {
            id: string;
            name: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            type: import(".prisma/client").$Enums.AccountType;
            isActive: boolean;
        };
    }>;
    archive(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: {
            id: string;
            name: string;
            currency: string | null;
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            type: import(".prisma/client").$Enums.AccountType;
            isActive: boolean;
        };
    }>;
}
