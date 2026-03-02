import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreditCardsRepository } from './credit-cards.repository';
import { HouseholdsService } from '../households/households.service';
import { CreateCreditCardDto, UpdateCreditCardDto } from './credit-cards.schemas';
import { resolveLocale, t } from './credit-cards.messages';
import { AccountType } from '@prisma/client';

@Injectable()
export class CreditCardsService {
  constructor(
    private readonly creditCardsRepository: CreditCardsRepository,
    private readonly householdsService: HouseholdsService,
  ) {}

  async list(userId: string, householdId: string, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    return this.creditCardsRepository.listByHousehold(householdId);
  }

  async create(userId: string, householdId: string, payload: CreateCreditCardDto, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    const locale = resolveLocale(acceptLanguage);

    if (payload.accountId) {
      const account = await this.creditCardsRepository.findAccountById(payload.accountId);
      if (!account || account.householdId !== householdId || account.type !== AccountType.CREDIT_CARD || !account.isActive) {
        throw new BadRequestException({ message: t(locale, 'invalidAccount') });
      }
      const limitAmount = payload.limitAmount !== undefined ? this.parseAmountToCents(payload.limitAmount) : null;
      if (payload.limitAmount !== undefined && limitAmount === null) {
        throw new BadRequestException({ message: t(locale, 'invalidBody') });
      }
      return this.creditCardsRepository.createCreditCard({
        name: payload.name,
        closingDay: payload.closingDay,
        dueDay: payload.dueDay,
        limitAmount,
        household: { connect: { id: householdId } },
        account: { connect: { id: account.id } },
      });
    }

    const limitAmount = payload.limitAmount !== undefined ? this.parseAmountToCents(payload.limitAmount) : null;
    if (payload.limitAmount !== undefined && limitAmount === null) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.creditCardsRepository.createWithAccount(householdId, { name: payload.name }, {
      name: payload.name,
      closingDay: payload.closingDay,
      dueDay: payload.dueDay,
      limitAmount,
      household: { connect: { id: householdId } },
    });
  }

  async get(userId: string, cardId: string, acceptLanguage?: string) {
    const card = await this.creditCardsRepository.findById(cardId);
    if (!card || !card.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, card.householdId, acceptLanguage);
    return card;
  }

  async update(userId: string, cardId: string, payload: UpdateCreditCardDto, acceptLanguage?: string) {
    const card = await this.creditCardsRepository.findById(cardId);
    if (!card || !card.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, card.householdId, acceptLanguage);
    const limitAmount =
      payload.limitAmount !== undefined ? this.parseAmountToCents(payload.limitAmount) : card.limitAmount;
    if (payload.limitAmount !== undefined && limitAmount === null) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.creditCardsRepository.updateCreditCard(cardId, {
      name: payload.name ?? card.name,
      closingDay: payload.closingDay ?? card.closingDay,
      dueDay: payload.dueDay ?? card.dueDay,
      limitAmount,
    });
  }

  async archive(userId: string, cardId: string, acceptLanguage?: string) {
    const card = await this.creditCardsRepository.findById(cardId);
    if (!card || !card.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, card.householdId, acceptLanguage);
    return this.creditCardsRepository.archiveCreditCard(cardId);
  }

  private parseAmountToCents(value?: string): bigint | null {
    if (!value) return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    const normalized = trimmed
      .replace(/[^0-9,.\-]/g, '')
      .replace(/\.(?=.*\.)/g, '')
      .replace(/,(?=.*,)/g, '');
    const hasComma = normalized.includes(',');
    const hasDot = normalized.includes('.');
    let numeric = normalized;
    if (hasComma && hasDot) {
      numeric =
        normalized.lastIndexOf(',') > normalized.lastIndexOf('.')
          ? normalized.replace(/\./g, '').replace(',', '.')
          : normalized.replace(/,/g, '');
    } else if (hasComma && !hasDot) {
      numeric = normalized.replace(',', '.');
    }
    const parsed = Number(numeric);
    if (!Number.isFinite(parsed)) return null;
    return BigInt(Math.round(parsed * 100));
  }
}
