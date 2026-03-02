import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly SYSTEM_ACCOUNT_PREFIX = '__system__';

  sumByCategory(householdId: string, start: Date, end: Date) {
    return this.prisma.transactionLine.groupBy({
      by: ['categoryId'],
      _sum: { amount: true },
      where: {
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

  sumByAccount(householdId: string, start: Date, end: Date) {
    return this.prisma.transactionLine.groupBy({
      by: ['accountId'],
      _sum: { amount: true },
      where: {
        transaction: {
          householdId,
          isActive: true,
          date: {
            gte: start,
            lt: end,
          },
        },
        account: {
          name: {
            not: {
              startsWith: this.SYSTEM_ACCOUNT_PREFIX,
            },
          },
        },
      },
    });
  }

  listTransactionsForReport(householdId: string, start: Date, end: Date) {
    return this.prisma.transaction.findMany({
      where: {
        householdId,
        isActive: true,
        date: {
          gte: start,
          lt: end,
        },
      },
      select: {
        id: true,
        date: true,
        lines: {
          select: {
            amount: true,
            categoryId: true,
            account: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
              },
            },
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
