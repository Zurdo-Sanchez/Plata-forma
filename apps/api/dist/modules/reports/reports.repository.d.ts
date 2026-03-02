import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ReportsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly SYSTEM_ACCOUNT_PREFIX;
    sumByCategory(householdId: string, start: Date, end: Date): Prisma.GetTransactionLineGroupByPayload<{
        by: "categoryId"[];
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
    sumByAccount(householdId: string, start: Date, end: Date): Prisma.GetTransactionLineGroupByPayload<{
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
            account: {
                name: {
                    not: {
                        startsWith: string;
                    };
                };
            };
        };
    }>;
    listTransactionsForReport(householdId: string, start: Date, end: Date): Prisma.PrismaPromise<{
        id: string;
        lines: {
            account: {
                id: string;
                name: string;
                type: import(".prisma/client").$Enums.AccountType;
            };
            category: {
                id: string;
                name: string;
            } | null;
            categoryId: string | null;
            amount: bigint;
        }[];
        date: Date;
    }[]>;
    findCategoriesByIds(ids: string[]): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        householdId: string;
        isActive: boolean;
    }[]> | never[];
    findAccountsByIds(ids: string[]): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.AccountType;
        householdId: string;
        currency: string | null;
        isActive: boolean;
    }[]> | never[];
}
