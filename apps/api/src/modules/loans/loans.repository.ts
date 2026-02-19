import { Injectable } from '@nestjs/common';
import { AccountType, Loan, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LoansRepository {
  constructor(private readonly prisma: PrismaService) {}

  listByHousehold(householdId: string) {
    return this.prisma.loan.findMany({
      where: { householdId },
      include: { account: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.loan.findUnique({
      where: { id },
      include: { account: true },
    });
  }

  findAccountById(id: string) {
    return this.prisma.account.findUnique({
      where: { id },
    });
  }

  async createWithAccount(
    householdId: string,
    accountData: { name: string },
    loanData: Prisma.LoanCreateInput,
  ): Promise<Loan> {
    return this.prisma.$transaction(async (trx) => {
      const account = await trx.account.create({
        data: {
          name: accountData.name,
          type: AccountType.LOAN,
          household: { connect: { id: householdId } },
          isActive: true,
        },
      });

      const loan = await trx.loan.create({
        data: {
          ...loanData,
          account: { connect: { id: account.id } },
        },
        include: { account: true },
      });

      return loan;
    });
  }

  createLoan(data: Prisma.LoanCreateInput) {
    return this.prisma.loan.create({
      data,
      include: { account: true },
    });
  }

  updateLoan(id: string, data: Prisma.LoanUpdateInput) {
    return this.prisma.loan.update({
      where: { id },
      data,
      include: { account: true },
    });
  }
}
