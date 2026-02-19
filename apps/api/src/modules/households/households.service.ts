import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { HouseholdRole } from '@prisma/client';
import { AddMemberDto, CreateHouseholdDto, UpdateHouseholdDto } from './households.schemas';
import { HouseholdsRepository } from './households.repository';
import { resolveLocale, t } from './households.messages';

@Injectable()
export class HouseholdsService {
  constructor(private readonly repository: HouseholdsRepository) {}

  async list(userId: string) {
    return this.repository.listForUser(userId);
  }

  async create(userId: string, payload: CreateHouseholdDto) {
    return this.repository.createHousehold({
      name: payload.name,
      currency: payload.currency || null,
      members: {
        create: {
          user: { connect: { id: userId } },
          role: HouseholdRole.OWNER,
        },
      },
    });
  }

  async get(userId: string, householdId: string, acceptLanguage?: string) {
    await this.assertMember(userId, householdId, acceptLanguage);
    const household = await this.repository.findById(householdId);
    if (!household) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    return household;
  }

  async update(userId: string, householdId: string, payload: UpdateHouseholdDto, acceptLanguage?: string) {
    await this.assertOwner(userId, householdId, acceptLanguage);
    return this.repository.updateHousehold(householdId, {
      name: payload.name,
      currency: payload.currency ?? null,
    });
  }

  async addMember(userId: string, householdId: string, payload: AddMemberDto, acceptLanguage?: string) {
    await this.assertOwner(userId, householdId, acceptLanguage);
    const locale = resolveLocale(acceptLanguage);
    const email = payload.email.trim().toLowerCase();
    const targetUser = await this.repository.findUserByEmail(email);
    if (!targetUser) {
      throw new NotFoundException({ message: t(locale, 'userNotFound') });
    }

    const existing = await this.repository.findMembership(targetUser.id, householdId);
    if (existing) {
      throw new BadRequestException({ message: t(locale, 'memberExists') });
    }

    return this.repository.addMember({
      role: payload.role ? (payload.role as HouseholdRole) : HouseholdRole.MEMBER,
      household: { connect: { id: householdId } },
      user: { connect: { id: targetUser.id } },
    });
  }

  async assertMember(userId: string, householdId: string, acceptLanguage?: string) {
    const membership = await this.repository.findMembership(userId, householdId);
    if (!membership) {
      const locale = resolveLocale(acceptLanguage);
      throw new ForbiddenException({ message: t(locale, 'forbidden') });
    }
    return membership;
  }

  async assertOwner(userId: string, householdId: string, acceptLanguage?: string) {
    const membership = await this.assertMember(userId, householdId, acceptLanguage);
    if (membership.role !== HouseholdRole.OWNER) {
      const locale = resolveLocale(acceptLanguage);
      throw new ForbiddenException({ message: t(locale, 'forbidden') });
    }
    return membership;
  }
}
