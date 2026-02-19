import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  listByHousehold(where: Prisma.TransactionWhereInput) {
    return this.prisma.transaction.findMany({
      where,
      include: { lines: true },
      orderBy: { date: 'desc' },
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

  deleteTransaction(id: string) {
    return this.prisma.transaction.delete({
      where: { id },
      include: { lines: true },
    });
  }

  findAccountsByIds(ids: string[]) {
    if (ids.length === 0) return [];
    return this.prisma.account.findMany({
      where: { id: { in: ids } },
      select: { id: true, householdId: true },
    });
  }

  findCategoriesByIds(ids: string[]) {
    if (ids.length === 0) return [];
    return this.prisma.category.findMany({
      where: { id: { in: ids } },
      select: { id: true, householdId: true },
    });
  }
}
