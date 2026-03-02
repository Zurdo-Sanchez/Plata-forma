import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ReportsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly SYSTEM_ACCOUNT_PREFIX;
    sumByCategory(householdId: string, start: Date, end: Date): Prisma.GetTransactionLineGroupByPayload<Prisma.TransactionLineGroupByArgs<import("@prisma/client/runtime/library").DefaultArgs>>;
    sumByAccount(householdId: string, start: Date, end: Date): Prisma.GetTransactionLineGroupByPayload<Prisma.TransactionLineGroupByArgs<import("@prisma/client/runtime/library").DefaultArgs>>;
    listTransactionsForReport(householdId: string, start: Date, end: Date): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
        updatedAt: Date;
    }[]>;
    findCategoriesByIds(ids: string[]): never[] | Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        householdId: string;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        type: import(".prisma/client").$Enums.CategoryType;
    }[]>;
    findAccountsByIds(ids: string[]): never[] | Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        householdId: string;
        updatedAt: Date;
        isActive: boolean;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        currency: string | null;
    }[]>;
}
