import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto, TransactionLineDto, TransactionsQueryDto, UpdateTransactionDto } from './transactions.schemas';
import { HouseholdsService } from '../households/households.service';
import { resolveLocale, t } from './transactions.messages';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly householdsService: HouseholdsService,
  ) {}

  async list(userId: string, householdId: string, query: TransactionsQueryDto, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);

    const where: any = { householdId };
    const dateFilter: any = {};
    const fromDate = query.from ? this.parseDate(query.from) : null;
    const toDate = query.to ? this.parseDate(query.to) : null;
    if (fromDate) dateFilter.gte = fromDate;
    if (toDate) dateFilter.lte = toDate;
    if (Object.keys(dateFilter).length) {
      where.date = dateFilter;
    }

    if (query.search) {
      where.description = { contains: query.search, mode: 'insensitive' };
    }

    if (query.accountId || query.categoryId || query.minAmount || query.maxAmount) {
      const lineFilter: any = {};
      if (query.accountId) lineFilter.accountId = query.accountId;
      if (query.categoryId) lineFilter.categoryId = query.categoryId;

      const min = this.parseBigint(query.minAmount);
      const max = this.parseBigint(query.maxAmount);
      if (min !== null || max !== null) {
        lineFilter.amount = {};
        if (min !== null) lineFilter.amount.gte = min;
        if (max !== null) lineFilter.amount.lte = max;
      }

      where.lines = { some: lineFilter };
    }

    return this.transactionsRepository.listByHousehold(where);
  }

  async create(userId: string, householdId: string, payload: CreateTransactionDto, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    const locale = resolveLocale(acceptLanguage);
    const date = this.parseDate(payload.date);
    if (!date) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }

    const lines = await this.validateLines(householdId, payload.lines, acceptLanguage);

    return this.transactionsRepository.createTransaction({
      household: { connect: { id: householdId } },
      date,
      description: payload.description || null,
      lines: {
        create: lines.map((line) => ({
          account: { connect: { id: line.accountId } },
          category: line.categoryId ? { connect: { id: line.categoryId } } : undefined,
          amount: line.amount,
          memo: line.memo || null,
        })),
      },
    });
  }

  async get(userId: string, transactionId: string, acceptLanguage?: string) {
    const transaction = await this.transactionsRepository.findById(transactionId);
    if (!transaction) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, transaction.householdId, acceptLanguage);
    return transaction;
  }

  async update(userId: string, transactionId: string, payload: UpdateTransactionDto, acceptLanguage?: string) {
    const existing = await this.transactionsRepository.findById(transactionId);
    if (!existing) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, existing.householdId, acceptLanguage);
    const locale = resolveLocale(acceptLanguage);

    const data: any = {};
    if (payload.date) {
      const date = this.parseDate(payload.date);
      if (!date) {
        throw new BadRequestException({ message: t(locale, 'invalidBody') });
      }
      data.date = date;
    }
    if (payload.description !== undefined) {
      data.description = payload.description || null;
    }

    if (payload.lines) {
      const lines = await this.validateLines(existing.householdId, payload.lines, acceptLanguage);
      data.lines = {
        deleteMany: {},
        create: lines.map((line) => ({
          account: { connect: { id: line.accountId } },
          category: line.categoryId ? { connect: { id: line.categoryId } } : undefined,
          amount: line.amount,
          memo: line.memo || null,
        })),
      };
    }

    return this.transactionsRepository.updateTransaction(transactionId, data);
  }

  async remove(userId: string, transactionId: string, acceptLanguage?: string) {
    const existing = await this.transactionsRepository.findById(transactionId);
    if (!existing) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, existing.householdId, acceptLanguage);
    return this.transactionsRepository.deleteTransaction(transactionId);
  }

  private parseDate(value: string): Date | null {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const date = new Date(trimmed.includes('T') ? trimmed : `${trimmed}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private parseBigint(value?: string): bigint | null {
    if (!value) return null;
    try {
      return BigInt(value);
    } catch {
      return null;
    }
  }

  private async validateLines(householdId: string, lines: TransactionLineDto[], acceptLanguage?: string) {
    const locale = resolveLocale(acceptLanguage);
    const sum = lines.reduce((acc, line) => acc + BigInt(line.amount), BigInt(0));
    if (sum !== BigInt(0)) {
      throw new BadRequestException({ message: t(locale, 'unbalanced') });
    }

    const accountIds = [...new Set(lines.map((line) => line.accountId))];
    const accounts = await this.transactionsRepository.findAccountsByIds(accountIds);
    if (accounts.length !== accountIds.length || accounts.some((acc) => acc.householdId !== householdId)) {
      throw new BadRequestException({ message: t(locale, 'invalidReference') });
    }

    const categoryIds = [...new Set(lines.map((line) => line.categoryId).filter(Boolean) as string[])];
    if (categoryIds.length) {
      const categories = await this.transactionsRepository.findCategoriesByIds(categoryIds);
      if (categories.length !== categoryIds.length || categories.some((cat) => cat.householdId !== householdId)) {
        throw new BadRequestException({ message: t(locale, 'invalidReference') });
      }
    }

    return lines.map((line) => ({
      ...line,
      amount: BigInt(line.amount),
    }));
  }
}
