import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ReportsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    sumByCategory(householdId: string, start: Date, end: Date): Prisma.GetTransactionLineGroupByPayload<{
        by: "categoryId"[];
        _sum: {
            amount: true;
        };
        where: {
            transaction: {
                householdId: string;
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
                date: {
                    gte: Date;
                    lt: Date;
                };
            };
        };
    }>;
    findCategoriesByIds(ids: string[]): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.CategoryType;
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
