import { Injectable } from '@nestjs/common';
import { AccountType, Prisma, Transaction } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly SYSTEM_ACCOUNT_NAME = '__system__:equity';

  listByHousehold(where: Prisma.TransactionWhereInput) {
    return this.prisma.transaction.findMany({
      where,
      include: { lines: true },
      orderBy: { date: 'desc' },
    });
  }

  sumByAccountForRange(householdId: string, start: Date, end: Date) {
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
      },
    });
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

  findById(id: string): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: { lines: true },
    });
  }

  createTransaction(data: Prisma.TransactionCreateInput) {
    return this.prisma.transaction.create({
      data,
      include: { lines: true },
    });
  }

  updateTransaction(id: string, data: Prisma.TransactionUpdateInput) {
    return this.prisma.transaction.update({
      where: { id },
      data,
      include: { lines: true },
    });
  }

  archiveTransaction(id: string) {
    return this.prisma.transaction.update({
      where: { id },
      data: { isActive: false },
      include: { lines: true },
    });
  }

  async ensureSystemAccount(householdId: string) {
    const existing = await this.prisma.account.findFirst({
      where: { householdId, name: this.SYSTEM_ACCOUNT_NAME },
      select: { id: true },
    });
    if (existing) return existing.id;
    const account = await this.prisma.account.create({
      data: {
        name: this.SYSTEM_ACCOUNT_NAME,
        type: AccountType.CASH,
        isActive: false,
        household: { connect: { id: householdId } },
      },
      select: { id: true },
    });
    return account.id;
  }

  findAccountsByIds(ids: string[]) {
    if (ids.length === 0) return [];
    return this.prisma.account.findMany({
      where: { id: { in: ids } },
      select: { id: true, householdId: true, isActive: true, name: true },
    });
  }

  findCategoriesByIds(ids: string[]) {
    if (ids.length === 0) return [];
    return this.prisma.category.findMany({
      where: { id: { in: ids } },
      select: { id: true, householdId: true, isActive: true },
    });
  }

  findDuplicateEntry(
    householdId: string,
    date: Date,
    fromLine: { accountId: string; categoryId: string | null; amount: bigint },
    toLine: { accountId: string; categoryId: string | null; amount: bigint },
  ) {
    return this.prisma.transaction.findFirst({
      where: {
        householdId,
        isActive: true,
        date,
        AND: [
          {
            lines: {
              some: {
                accountId: fromLine.accountId,
                categoryId: fromLine.categoryId,
                amount: fromLine.amount,
              },
            },
          },
          {
            lines: {
              some: {
                accountId: toLine.accountId,
                categoryId: toLine.categoryId,
                amount: toLine.amount,
              },
            },
          },
        ],
      },
      include: { lines: true },
    });
  }
}
