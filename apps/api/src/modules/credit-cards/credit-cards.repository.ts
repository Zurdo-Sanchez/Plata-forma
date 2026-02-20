import { Injectable } from '@nestjs/common';
import { AccountType, CreditCard, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CreditCardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  listByHousehold(householdId: string) {
    return this.prisma.creditCard.findMany({
      where: { householdId },
      include: { account: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.creditCard.findUnique({
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
    cardData: Prisma.CreditCardCreateWithoutAccountInput,
  ): Promise<CreditCard> {
    return this.prisma.$transaction(async (trx) => {
      const account = await trx.account.create({
        data: {
          name: accountData.name,
          type: AccountType.CREDIT_CARD,
          household: { connect: { id: householdId } },
          isActive: true,
        },
      });

      const card = await trx.creditCard.create({
        data: {
          ...cardData,
          account: { connect: { id: account.id } },
        },
        include: { account: true },
      });

      return card;
    });
  }

  createCreditCard(data: Prisma.CreditCardCreateInput) {
    return this.prisma.creditCard.create({
      data,
      include: { account: true },
    });
  }

  updateCreditCard(id: string, data: Prisma.CreditCardUpdateInput) {
    return this.prisma.creditCard.update({
      where: { id },
      data,
      include: { account: true },
    });
  }
}
