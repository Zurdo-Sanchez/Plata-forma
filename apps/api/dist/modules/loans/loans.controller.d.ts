import { AuthRequest } from '../auth/auth.guard';
import { LoansService } from './loans.service';
export declare class LoansController {
    private readonly loansService;
    constructor(loansService: LoansService);
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
        principalAmount: bigint;
        interestRateBps: number;
        startDate: Date;
        termMonths: number | null;
    })[]>;
    create(request: AuthRequest, householdId: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        loan: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            householdId: string;
            accountId: string;
            principalAmount: bigint;
            interestRateBps: number;
            startDate: Date;
            termMonths: number | null;
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
        principalAmount: bigint;
        interestRateBps: number;
        startDate: Date;
        termMonths: number | null;
    }>;
    update(request: AuthRequest, id: string, body: unknown, acceptLanguage?: string): Promise<{
        ok: boolean;
        message: string;
        loan: {
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
            principalAmount: bigint;
            interestRateBps: number;
            startDate: Date;
            termMonths: number | null;
        };
    }>;
}
