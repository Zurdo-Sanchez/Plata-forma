import { Loan, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class LoansRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(householdId: string): Prisma.PrismaPromise<({
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
        accountId: string;
        principalAmount: bigint;
        interestRateBps: number;
        startDate: Date;
        termMonths: number | null;
    })[]>;
    findById(id: string): Prisma.Prisma__LoanClient<({
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
        accountId: string;
        principalAmount: bigint;
        interestRateBps: number;
        startDate: Date;
        termMonths: number | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAccountById(id: string): Prisma.Prisma__AccountClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        householdId: string;
        currency: string | null;
        isActive: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    createWithAccount(householdId: string, accountData: {
        name: string;
    }, loanData: Prisma.LoanCreateWithoutAccountInput): Promise<Loan>;
    createLoan(data: Prisma.LoanCreateInput): Prisma.Prisma__LoanClient<{
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
        accountId: string;
        principalAmount: bigint;
        interestRateBps: number;
        startDate: Date;
        termMonths: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateLoan(id: string, data: Prisma.LoanUpdateInput): Prisma.Prisma__LoanClient<{
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
        accountId: string;
        principalAmount: bigint;
        interestRateBps: number;
        startDate: Date;
        termMonths: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    archiveLoan(id: string): Promise<{
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
        accountId: string;
        principalAmount: bigint;
        interestRateBps: number;
        startDate: Date;
        termMonths: number | null;
    }>;
}
