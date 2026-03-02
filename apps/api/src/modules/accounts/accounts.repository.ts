import { Injectable } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly SYSTEM_ACCOUNT_PREFIX = '__system__';

  listByHousehold(householdId: string) {
    return this.prisma.account.findMany({
      where: {
        householdId,
        isActive: true,
        name: {
          not: {
            startsWith: this.SYSTEM_ACCOUNT_PREFIX,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  sumByAccountAllTime(householdId: string) {
    return this.prisma.transactionLine.groupBy({
      by: ['accountId'],
      _sum: { amount: true },
      where: {
        transaction: {
          householdId,
          isActive: true,
        },
      },
    });
  }

  findById(id: string): Promise<Account | null> {
    return this.prisma.account.findUnique({ where: { id } });
  }

  createAccount(data: Prisma.AccountCreateInput): Promise<Account> {
    return this.prisma.account.create({ data });
  }

  updateAccount(id: string, data: Prisma.AccountUpdateInput): Promise<Account> {
    return this.prisma.account.update({ where: { id }, data });
  }
}
