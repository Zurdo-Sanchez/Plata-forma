import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CategoriesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByHousehold(householdId: string): any;
    findById(id: string): Promise<Category | null>;
    createCategory(data: Prisma.CategoryCreateInput): Promise<Category>;
    updateCategory(id: string, data: Prisma.CategoryUpdateInput): Promise<Category>;
}
