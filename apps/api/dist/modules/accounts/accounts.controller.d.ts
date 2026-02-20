import { AuthRequest } from '../auth/auth.guard';
import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        householdId: string;
        currency: string | null;
        isActive: boolean;
    }[]>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            householdId: string;
            currency: string | null;
            isActive: boolean;
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        householdId: string;
        currency: string | null;
        isActive: boolean;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            householdId: string;
            currency: string | null;
            isActive: boolean;
        };
    }>;
    archive(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            householdId: string;
            currency: string | null;
            isActive: boolean;
        };
    }>;
}
