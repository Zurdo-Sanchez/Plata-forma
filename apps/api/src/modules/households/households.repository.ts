import { Injectable } from '@nestjs/common';
import { Household, HouseholdMember, Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HouseholdsRepository {
  constructor(private readonly prisma: PrismaService) {}

  listForUser(userId: string) {
    return this.prisma.household.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: {
        members: {
          where: { userId },
          select: { role: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  findById(id: string) {
    return this.prisma.household.findUnique({
      where: { id },
    });
  }

  createHousehold(data: Prisma.HouseholdCreateInput): Promise<Household> {
    return this.prisma.household.create({ data });
  }

  updateHousehold(id: string, data: Prisma.HouseholdUpdateInput): Promise<Household> {
    return this.prisma.household.update({
      where: { id },
      data,
    });
  }

  deleteHouseholdCascade(id: string): Promise<Household> {
    return this.prisma.$transaction(async (trx) => {
      await trx.transactionLine.deleteMany({
        where: {
          transaction: {
            householdId: id,
          },
        },
      });
      await trx.transaction.deleteMany({ where: { householdId: id } });
      await trx.creditCard.deleteMany({ where: { householdId: id } });
      await trx.loan.deleteMany({ where: { householdId: id } });
      await trx.account.deleteMany({ where: { householdId: id } });
      await trx.category.deleteMany({ where: { householdId: id } });
      await trx.householdMember.deleteMany({ where: { householdId: id } });
      return trx.household.delete({ where: { id } });
    });
  }

  findMembership(userId: string, householdId: string): Promise<HouseholdMember | null> {
    return this.prisma.householdMember.findUnique({
      where: {
        householdId_userId: {
          householdId,
          userId,
        },
      },
    });
  }

  addMember(data: Prisma.HouseholdMemberCreateInput): Promise<HouseholdMember> {
    return this.prisma.householdMember.create({ data });
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
