import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  listByHousehold(householdId: string) {
    return this.prisma.category.findMany({
      where: { householdId, isActive: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  findById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  updateCategory(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data });
  }

  sumByCategoryForRange(householdId: string, start: Date, end: Date) {
    return this.prisma.transactionLine.groupBy({
      by: ['categoryId'],
      _sum: { amount: true },
      where: {
        categoryId: { not: null },
        transaction: {
          householdId,
          isActive: true,
          date: {
            gte: start,
            lt: end,
          },
        },
      },
    });
  }
}
