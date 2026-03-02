import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AccountType } from '@prisma/client';
import { LoansRepository } from './loans.repository';
import { HouseholdsService } from '../households/households.service';
import { CreateLoanDto, UpdateLoanDto } from './loans.schemas';
import { resolveLocale, t } from './loans.messages';

@Injectable()
export class LoansService {
  constructor(
    private readonly loansRepository: LoansRepository,
    private readonly householdsService: HouseholdsService,
  ) {}

  async list(userId: string, householdId: string, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    return this.loansRepository.listByHousehold(householdId);
  }

  async create(userId: string, householdId: string, payload: CreateLoanDto, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    const locale = resolveLocale(acceptLanguage);
    const startDate = this.parseDate(payload.startDate);
    if (!startDate) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }

    if (payload.accountId) {
      const account = await this.loansRepository.findAccountById(payload.accountId);
      if (!account || account.householdId !== householdId || account.type !== AccountType.LOAN || !account.isActive) {
        throw new BadRequestException({ message: t(locale, 'invalidAccount') });
      }
      const principalAmount = this.parseAmountToCents(payload.principalAmount);
      if (principalAmount === null) {
        throw new BadRequestException({ message: t(locale, 'invalidBody') });
      }
      return this.loansRepository.createLoan({
        name: payload.name,
        principalAmount,
        interestRateBps: payload.interestRateBps,
        startDate,
        termMonths: payload.termMonths ?? null,
        household: { connect: { id: householdId } },
        account: { connect: { id: account.id } },
      });
    }

    const principalAmount = this.parseAmountToCents(payload.principalAmount);
    if (principalAmount === null) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.loansRepository.createWithAccount(householdId, { name: payload.name }, {
      name: payload.name,
      principalAmount,
      interestRateBps: payload.interestRateBps,
      startDate,
      termMonths: payload.termMonths ?? null,
      household: { connect: { id: householdId } },
    });
  }

  async get(userId: string, loanId: string, acceptLanguage?: string) {
    const loan = await this.loansRepository.findById(loanId);
    if (!loan || !loan.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, loan.householdId, acceptLanguage);
    return loan;
  }

  async update(userId: string, loanId: string, payload: UpdateLoanDto, acceptLanguage?: string) {
    const loan = await this.loansRepository.findById(loanId);
    if (!loan || !loan.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, loan.householdId, acceptLanguage);
    const locale = resolveLocale(acceptLanguage);

    let startDate: Date | undefined;
    if (payload.startDate) {
      startDate = this.parseDate(payload.startDate) ?? undefined;
      if (!startDate) {
        throw new BadRequestException({ message: t(locale, 'invalidBody') });
      }
    }

    const principalAmount =
      payload.principalAmount !== undefined ? this.parseAmountToCents(payload.principalAmount) : loan.principalAmount;
    if (payload.principalAmount !== undefined && principalAmount === null) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }

    return this.loansRepository.updateLoan(loanId, {
      name: payload.name ?? loan.name,
      principalAmount,
      interestRateBps: payload.interestRateBps ?? loan.interestRateBps,
      startDate: startDate ?? loan.startDate,
      termMonths: payload.termMonths ?? loan.termMonths,
    });
  }

  async archive(userId: string, loanId: string, acceptLanguage?: string) {
    const loan = await this.loansRepository.findById(loanId);
    if (!loan || !loan.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, loan.householdId, acceptLanguage);
    return this.loansRepository.archiveLoan(loanId);
  }

  private parseDate(value: string): Date | null {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const date = new Date(trimmed.includes('T') ? trimmed : `${trimmed}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
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
