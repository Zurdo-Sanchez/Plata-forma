import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from './accounts.schemas';
import { AccountsRepository } from './accounts.repository';
import { HouseholdsService } from '../households/households.service';
import { resolveLocale, t } from './accounts.messages';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly householdsService: HouseholdsService,
  ) {}

  async list(userId: string, householdId: string, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    return this.accountsRepository.listByHousehold(householdId);
  }

  async create(userId: string, householdId: string, payload: CreateAccountDto, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    return this.accountsRepository.createAccount({
      name: payload.name,
      type: payload.type,
      currency: payload.currency || null,
      isActive: payload.isActive ?? true,
      household: { connect: { id: householdId } },
    });
  }

  async get(userId: string, accountId: string, acceptLanguage?: string) {
    const account = await this.accountsRepository.findById(accountId);
    if (!account) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, account.householdId, acceptLanguage);
    return account;
  }

  async update(userId: string, accountId: string, payload: UpdateAccountDto, acceptLanguage?: string) {
    const account = await this.accountsRepository.findById(accountId);
    if (!account) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, account.householdId, acceptLanguage);
    return this.accountsRepository.updateAccount(accountId, {
      name: payload.name,
      type: payload.type,
      currency: payload.currency ?? null,
      isActive: payload.isActive ?? account.isActive,
    });
  }

  async archive(userId: string, accountId: string, acceptLanguage?: string) {
    const account = await this.accountsRepository.findById(accountId);
    if (!account) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, account.householdId, acceptLanguage);
    return this.accountsRepository.updateAccount(accountId, { isActive: false });
  }
}
