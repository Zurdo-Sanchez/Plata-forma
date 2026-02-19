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
      if (!account || account.householdId !== householdId || account.type !== AccountType.CREDIT_CARD) {
        throw new BadRequestException({ message: t(locale, 'invalidAccount') });
      }
      return this.creditCardsRepository.createCreditCard({
        name: payload.name,
        closingDay: payload.closingDay,
        dueDay: payload.dueDay,
        limitAmount: payload.limitAmount !== undefined ? BigInt(payload.limitAmount) : null,
        household: { connect: { id: householdId } },
        account: { connect: { id: account.id } },
      });
    }

    return this.creditCardsRepository.createWithAccount(householdId, { name: payload.name }, {
      name: payload.name,
      closingDay: payload.closingDay,
      dueDay: payload.dueDay,
      limitAmount: payload.limitAmount !== undefined ? BigInt(payload.limitAmount) : null,
      household: { connect: { id: householdId } },
    });
  }

  async get(userId: string, cardId: string, acceptLanguage?: string) {
    const card = await this.creditCardsRepository.findById(cardId);
    if (!card) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, card.householdId, acceptLanguage);
    return card;
  }

  async update(userId: string, cardId: string, payload: UpdateCreditCardDto, acceptLanguage?: string) {
    const card = await this.creditCardsRepository.findById(cardId);
    if (!card) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, card.householdId, acceptLanguage);
    return this.creditCardsRepository.updateCreditCard(cardId, {
      name: payload.name,
      closingDay: payload.closingDay,
      dueDay: payload.dueDay,
      limitAmount: payload.limitAmount !== undefined ? BigInt(payload.limitAmount) : card.limitAmount,
    });
  }
}
