import { AuthRequest } from '../auth/auth.guard';
import { LoansService } from './loans.service';
export declare class LoansController {
    private readonly loansService;
    constructor(loansService: LoansService);
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
        principalAmount: bigint;
        interestRateBps: number;
        startDate: Date;
        termMonths: number | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        loan: {
            id: string;
            householdId: string;
            accountId: string;
            name: string;
            principalAmount: bigint;
            interestRateBps: number;
            startDate: Date;
            termMonths: number | null;
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
        principalAmount: bigint;
        interestRateBps: number;
        startDate: Date;
        termMonths: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        loan: {
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
            principalAmount: bigint;
            interestRateBps: number;
            startDate: Date;
            termMonths: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
