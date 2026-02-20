import { LoansRepository } from './loans.repository';
import { HouseholdsService } from '../households/households.service';
import { CreateLoanDto, UpdateLoanDto } from './loans.schemas';
export declare class LoansService {
    private readonly loansRepository;
    private readonly householdsService;
    constructor(loansRepository: LoansRepository, householdsService: HouseholdsService);
    list(userId: string, householdId: string, acceptLanguage?: string): Promise<({
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
    create(userId: string, householdId: string, payload: CreateLoanDto, acceptLanguage?: string): Promise<{
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
    get(userId: string, loanId: string, acceptLanguage?: string): Promise<{
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
    update(userId: string, loanId: string, payload: UpdateLoanDto, acceptLanguage?: string): Promise<{
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
    private parseDate;
}
