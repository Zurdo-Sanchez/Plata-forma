import { Prisma, Transaction } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class TransactionsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(where: Prisma.TransactionWhereInput): any;
    findById(id: string): Promise<Transaction | null>;
    createTransaction(data: Prisma.TransactionCreateInput): any;
    updateTransaction(id: string, data: Prisma.TransactionUpdateInput): any;
    deleteTransaction(id: string): any;
    findAccountsByIds(ids: string[]): any;
    findCategoriesByIds(ids: string[]): any;
}
