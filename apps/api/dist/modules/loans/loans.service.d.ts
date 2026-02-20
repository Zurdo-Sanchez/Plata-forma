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
    create(userId: string, householdId: string, payload: CreateLoanDto, acceptLanguage?: string): Promise<{
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
    get(userId: string, loanId: string, acceptLanguage?: string): Promise<{
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
    update(userId: string, loanId: string, payload: UpdateLoanDto, acceptLanguage?: string): Promise<{
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
    private parseDate;
}
