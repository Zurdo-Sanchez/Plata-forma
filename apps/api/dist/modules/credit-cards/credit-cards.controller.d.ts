import { AuthRequest } from '../auth/auth.guard';
import { CreditCardsService } from './credit-cards.service';
export declare class CreditCardsController {
    private readonly creditCardsService;
    constructor(creditCardsService: CreditCardsService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<({
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        householdId: string;
        accountId: string;
        name: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        card: {
            id: string;
            householdId: string;
            accountId: string;
            name: string;
            closingDay: number;
            dueDay: number;
            limitAmount: bigint | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        householdId: string;
        accountId: string;
        name: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        card: {
            account: {
                id: string;
                householdId: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                type: import(".prisma/client").$Enums.AccountType;
                currency: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            householdId: string;
            accountId: string;
            name: string;
            closingDay: number;
            dueDay: number;
            limitAmount: bigint | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
