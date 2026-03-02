import { Loan, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class LoansRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(householdId: string): Prisma.PrismaPromise<{
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
    }[]>;
    findById(id: string): Prisma.Prisma__LoanClient<({
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
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
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAccountById(id: string): Prisma.Prisma__AccountClient<{
        id: string;
        householdId: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    createWithAccount(householdId: string, accountData: {
        name: string;
    }, loanData: Prisma.LoanCreateWithoutAccountInput): Promise<Loan>;
    createLoan(data: Prisma.LoanCreateInput): Prisma.Prisma__LoanClient<{
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateLoan(id: string, data: Prisma.LoanUpdateInput): Prisma.Prisma__LoanClient<{
        account: {
            id: string;
            householdId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            type: import(".prisma/client").$Enums.AccountType;
            currency: string | null;
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    archiveLoan(id: string): Promise<{
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
}
