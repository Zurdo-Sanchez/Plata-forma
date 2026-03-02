import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CategoriesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(householdId: string): Prisma.PrismaPromise<{
        id: string;
        householdId: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<Category | null>;
    createCategory(data: Prisma.CategoryCreateInput): Promise<Category>;
    updateCategory(id: string, data: Prisma.CategoryUpdateInput): Promise<Category>;
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
}
