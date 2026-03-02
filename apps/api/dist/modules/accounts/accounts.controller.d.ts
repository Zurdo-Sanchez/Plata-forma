import { AuthRequest } from '../auth/auth.guard';
import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    balances(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<{
        totals: Record<string, bigint>;
    }>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: {
            id: string;
            householdId: string;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        id: string;
        householdId: string;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: {
            id: string;
            householdId: string;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    archive(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        account: {
            id: string;
            householdId: string;
            name: string;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
