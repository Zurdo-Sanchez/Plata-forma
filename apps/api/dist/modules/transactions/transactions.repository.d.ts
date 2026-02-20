import { Prisma, Transaction } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class TransactionsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(where: Prisma.TransactionWhereInput): Prisma.PrismaPromise<({
        lines: {
            id: number;
            createdAt: Date;
            accountId: string;
            transactionId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
    })[]>;
    findById(id: string): Promise<Transaction | null>;
    createTransaction(data: Prisma.TransactionCreateInput): Prisma.Prisma__TransactionClient<{
        lines: {
            id: number;
            createdAt: Date;
            accountId: string;
            transactionId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateTransaction(id: string, data: Prisma.TransactionUpdateInput): Prisma.Prisma__TransactionClient<{
        lines: {
            id: number;
            createdAt: Date;
            accountId: string;
            transactionId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteTransaction(id: string): Prisma.Prisma__TransactionClient<{
        lines: {
            id: number;
            createdAt: Date;
            accountId: string;
            transactionId: string;
            categoryId: string | null;
            amount: bigint;
            memo: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        householdId: string;
        date: Date;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAccountsByIds(ids: string[]): never[] | Prisma.PrismaPromise<{
        id: string;
        householdId: string;
    }[]>;
    findCategoriesByIds(ids: string[]): never[] | Prisma.PrismaPromise<{
        id: string;
        householdId: string;
    }[]>;
}
