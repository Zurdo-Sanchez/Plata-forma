import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsRepository {
  constructor(private readonly prisma: PrismaService) {}

  sumByCategory(householdId: string, start: Date, end: Date) {
    return this.prisma.transactionLine.groupBy({
      by: ['categoryId'],
      _sum: { amount: true },
      where: {
        transaction: {
          householdId,
          date: {
            gte: start,
            lt: end,
          },
        },
      },
    });
  }

  sumByAccount(householdId: string, start: Date, end: Date) {
    return this.prisma.transactionLine.groupBy({
      by: ['accountId'],
      _sum: { amount: true },
      where: {
        transaction: {
          householdId,
          date: {
            gte: start,
            lt: end,
          },
        },
      },
    });
  }

  findCategoriesByIds(ids: string[]) {
    if (ids.length === 0) return [];
    return this.prisma.category.findMany({
      where: { id: { in: ids } },
    });
  }

  findAccountsByIds(ids: string[]) {
    if (ids.length === 0) return [];
    return this.prisma.account.findMany({
      where: { id: { in: ids } },
    });
  }
}
