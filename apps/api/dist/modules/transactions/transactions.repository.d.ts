import { Prisma, Transaction } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class TransactionsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly SYSTEM_ACCOUNT_NAME;
    listByHousehold(where: Prisma.TransactionWhereInput): Prisma.PrismaPromise<({
        lines: {
            id: number;
            createdAt: Date;
            transactionId: string;
            accountId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    sumByAccountForRange(householdId: string, start: Date, end: Date): Prisma.GetTransactionLineGroupByPayload<{
        by: "accountId"[];
        _sum: {
            amount: true;
        };
        where: {
            transaction: {
                householdId: string;
                isActive: true;
                date: {
                    gte: Date;
                    lt: Date;
                };
            };
        };
    }>;
    sumByCategoryForRange(householdId: string, start: Date, end: Date): Prisma.GetTransactionLineGroupByPayload<{
        by: "categoryId"[];
        _sum: {
            amount: true;
        };
        where: {
            categoryId: {
                not: null;
            };
            transaction: {
                householdId: string;
                isActive: true;
                date: {
                    gte: Date;
                    lt: Date;
                };
            };
        };
    }>;
    findById(id: string): Promise<Transaction | null>;
    createTransaction(data: Prisma.TransactionCreateInput): Prisma.Prisma__TransactionClient<{
        lines: {
            id: number;
            createdAt: Date;
            transactionId: string;
            accountId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateTransaction(id: string, data: Prisma.TransactionUpdateInput): Prisma.Prisma__TransactionClient<{
        lines: {
            id: number;
            createdAt: Date;
            transactionId: string;
            accountId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    archiveTransaction(id: string): Prisma.Prisma__TransactionClient<{
        lines: {
            id: number;
            createdAt: Date;
            transactionId: string;
            accountId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    ensureSystemAccount(householdId: string): Promise<string>;
    findAccountsByIds(ids: string[]): never[] | Prisma.PrismaPromise<{
        id: string;
        householdId: string;
        isActive: boolean;
        name: string;
    }[]>;
    findCategoriesByIds(ids: string[]): never[] | Prisma.PrismaPromise<{
        id: string;
        householdId: string;
        isActive: boolean;
    }[]>;
    findDuplicateEntry(householdId: string, date: Date, fromLine: {
        accountId: string;
        categoryId: string | null;
        amount: bigint;
    }, toLine: {
        accountId: string;
        categoryId: string | null;
        amount: bigint;
    }): Prisma.Prisma__TransactionClient<({
        lines: {
            id: number;
            createdAt: Date;
            transactionId: string;
            accountId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        householdId: string;
        date: Date;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
