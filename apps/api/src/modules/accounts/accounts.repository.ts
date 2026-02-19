import { Injectable } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  listByHousehold(householdId: string) {
    return this.prisma.account.findMany({
      where: { householdId },
      orderBy: { createdAt: 'asc' },
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
