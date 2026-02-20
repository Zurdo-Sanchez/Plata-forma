import { AuthRequest } from '../auth/auth.guard';
import { CreditCardsService } from './credit-cards.service';
export declare class CreditCardsController {
    private readonly creditCardsService;
    constructor(creditCardsService: CreditCardsService);
    list(request: AuthRequest, householdId: string, acceptLanguage?: string): Promise<({
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
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        accountId: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
    })[]>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        card: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            accountId: string;
            closingDay: number;
            dueDay: number;
            limitAmount: bigint | null;
        };
    }>;
    get(request: AuthRequest, id: string, acceptLanguage?: string): Promise<{
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
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        accountId: string;
        closingDay: number;
        dueDay: number;
        limitAmount: bigint | null;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        card: {
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
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            accountId: string;
            closingDay: number;
            dueDay: number;
            limitAmount: bigint | null;
        };
    }>;
}
