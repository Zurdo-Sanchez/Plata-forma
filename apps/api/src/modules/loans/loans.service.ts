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
      if (!account || account.householdId !== householdId || account.type !== AccountType.LOAN) {
        throw new BadRequestException({ message: t(locale, 'invalidAccount') });
      }
      return this.loansRepository.createLoan({
        name: payload.name,
        principalAmount: BigInt(payload.principalAmount),
        interestRateBps: payload.interestRateBps,
        startDate,
        termMonths: payload.termMonths ?? null,
        household: { connect: { id: householdId } },
        account: { connect: { id: account.id } },
      });
    }

    return this.loansRepository.createWithAccount(householdId, { name: payload.name }, {
      name: payload.name,
      principalAmount: BigInt(payload.principalAmount),
      interestRateBps: payload.interestRateBps,
      startDate,
      termMonths: payload.termMonths ?? null,
      household: { connect: { id: householdId } },
    });
  }

  async get(userId: string, loanId: string, acceptLanguage?: string) {
    const loan = await this.loansRepository.findById(loanId);
    if (!loan) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, loan.householdId, acceptLanguage);
    return loan;
  }

  async update(userId: string, loanId: string, payload: UpdateLoanDto, acceptLanguage?: string) {
    const loan = await this.loansRepository.findById(loanId);
    if (!loan) {
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

    return this.loansRepository.updateLoan(loanId, {
      name: payload.name,
      principalAmount: payload.principalAmount !== undefined ? BigInt(payload.principalAmount) : loan.principalAmount,
      interestRateBps: payload.interestRateBps ?? loan.interestRateBps,
      startDate: startDate ?? loan.startDate,
      termMonths: payload.termMonths ?? loan.termMonths,
    });
  }

  private parseDate(value: string): Date | null {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const date = new Date(trimmed.includes('T') ? trimmed : `${trimmed}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }
}
