import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    const where: any = { householdId, isActive: true };
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

      const min = this.parseAmountToCents(query.minAmount);
      const max = this.parseAmountToCents(query.maxAmount);
      if (min !== null || max !== null) {
        lineFilter.amount = {};
        if (min !== null) lineFilter.amount.gte = min;
        if (max !== null) lineFilter.amount.lte = max;
      }

      where.lines = { some: lineFilter };
    }

    return this.transactionsRepository.listByHousehold(where);
  }

  async balances(userId: string, householdId: string, month: string, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    const locale = resolveLocale(acceptLanguage);
    const { start, end } = this.parseMonth(month);
    if (!start || !end) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }

    const [accountSums, categorySums] = await Promise.all([
      this.transactionsRepository.sumByAccountForRange(householdId, start, end),
      this.transactionsRepository.sumByCategoryForRange(householdId, start, end),
    ]);

    const accounts: Record<string, bigint> = {};
    const categories: Record<string, bigint> = {};

    for (const item of accountSums) {
      if (!item.accountId) continue;
      accounts[item.accountId] = item._sum.amount ?? BigInt(0);
    }

    for (const item of categorySums) {
      if (!item.categoryId) continue;
      categories[item.categoryId] = item._sum.amount ?? BigInt(0);
    }

    return { month, range: { start, end }, accounts, categories };
  }

  async create(userId: string, householdId: string, payload: CreateTransactionDto, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    const locale = resolveLocale(acceptLanguage);
    const date = this.parseDate(payload.date);
    if (!date) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    if (payload.entry) {
      const entry = payload.entry;
      const accountIds = [entry.from, entry.to]
        .filter((side) => side.kind === 'ACCOUNT')
        .map((side) => side.id);
      const categoryIds = [entry.from, entry.to]
        .filter((side) => side.kind === 'CATEGORY')
        .map((side) => side.id);

      const [accounts, categories] = await Promise.all([
        this.transactionsRepository.findAccountsByIds(accountIds),
        this.transactionsRepository.findCategoriesByIds(categoryIds),
      ]);

      if (
        accounts.length !== accountIds.length ||
        accounts.some(
          (acc) => acc.householdId !== householdId || (!acc.isActive && !acc.name?.startsWith('__system__')),
        )
      ) {
        throw new BadRequestException({ message: t(locale, 'invalidReference') });
      }

      if (
        categories.length !== categoryIds.length ||
        categories.some((cat) => cat.householdId !== householdId || !cat.isActive)
      ) {
        throw new BadRequestException({ message: t(locale, 'invalidReference') });
      }

      const amount = this.parseAmountToCents(entry.amount);
      if (amount === null) {
        throw new BadRequestException({ message: t(locale, 'invalidBody') });
      }
      const systemAccountId = await this.transactionsRepository.ensureSystemAccount(householdId);

      const resolveLine = (side: { kind: 'ACCOUNT' | 'CATEGORY'; id: string }, signedAmount: bigint) => {
        if (side.kind === 'ACCOUNT') {
          return {
            account: { connect: { id: side.id } },
            category: undefined,
            amount: signedAmount,
          };
        }
        return {
          account: { connect: { id: systemAccountId } },
          category: { connect: { id: side.id } },
          amount: signedAmount,
        };
      };

      const resolveLineFilter = (side: { kind: 'ACCOUNT' | 'CATEGORY'; id: string }, signedAmount: bigint) => {
        if (side.kind === 'ACCOUNT') {
          return {
            accountId: side.id,
            categoryId: null,
            amount: signedAmount,
          };
        }
        return {
          accountId: systemAccountId,
          categoryId: side.id,
          amount: signedAmount,
        };
      };

      const duplicate = await this.transactionsRepository.findDuplicateEntry(
        householdId,
        date,
        resolveLineFilter(entry.from, -amount),
        resolveLineFilter(entry.to, amount),
      );
      if (duplicate) {
        throw new ConflictException({ message: t(locale, 'duplicate') });
      }

      return this.transactionsRepository.createTransaction({
        household: { connect: { id: householdId } },
        date,
        description: payload.description || null,
        lines: {
          create: [
            {
              ...resolveLine(entry.from, -amount),
              memo: entry.memo || null,
            },
            {
              ...resolveLine(entry.to, amount),
              memo: entry.memo || null,
            },
          ],
        },
      });
    }

    const lines = await this.validateLines(householdId, payload.lines || [], acceptLanguage);

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
    if (!transaction || !transaction.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, transaction.householdId, acceptLanguage);
    return transaction;
  }

  async update(userId: string, transactionId: string, payload: UpdateTransactionDto, acceptLanguage?: string) {
    const existing = await this.transactionsRepository.findById(transactionId);
    if (!existing || !existing.isActive) {
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

    if (payload.entry) {
      const entry = payload.entry;
      const accountIds = [entry.from, entry.to]
        .filter((side) => side.kind === 'ACCOUNT')
        .map((side) => side.id);
      const categoryIds = [entry.from, entry.to]
        .filter((side) => side.kind === 'CATEGORY')
        .map((side) => side.id);

      const [accounts, categories] = await Promise.all([
        this.transactionsRepository.findAccountsByIds(accountIds),
        this.transactionsRepository.findCategoriesByIds(categoryIds),
      ]);

      if (
        accounts.length !== accountIds.length ||
        accounts.some(
          (acc) => acc.householdId !== existing.householdId || (!acc.isActive && !acc.name?.startsWith('__system__')),
        )
      ) {
        throw new BadRequestException({ message: t(locale, 'invalidReference') });
      }

      if (
        categories.length !== categoryIds.length ||
        categories.some((cat) => cat.householdId !== existing.householdId || !cat.isActive)
      ) {
        throw new BadRequestException({ message: t(locale, 'invalidReference') });
      }

      const amount = this.parseAmountToCents(entry.amount);
      if (amount === null) {
        throw new BadRequestException({ message: t(locale, 'invalidBody') });
      }
      const systemAccountId = await this.transactionsRepository.ensureSystemAccount(existing.householdId);

      const resolveLine = (side: { kind: 'ACCOUNT' | 'CATEGORY'; id: string }, signedAmount: bigint) => {
        if (side.kind === 'ACCOUNT') {
          return {
            account: { connect: { id: side.id } },
            category: undefined,
            amount: signedAmount,
          };
        }
        return {
          account: { connect: { id: systemAccountId } },
          category: { connect: { id: side.id } },
          amount: signedAmount,
        };
      };

      data.lines = {
        deleteMany: {},
        create: [
          { ...resolveLine(entry.from, -amount), memo: entry.memo || null },
          { ...resolveLine(entry.to, amount), memo: entry.memo || null },
        ],
      };
    } else if (payload.lines) {
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
    if (!existing || !existing.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, existing.householdId, acceptLanguage);
    return this.transactionsRepository.archiveTransaction(transactionId);
  }

  private parseDate(value: string): Date | null {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const date = new Date(trimmed.includes('T') ? trimmed : `${trimmed}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private parseMonth(value: string) {
    const [year, month] = value.split('-').map((part) => Number(part));
    if (!year || !month || month < 1 || month > 12) {
      return { start: null, end: null };
    }
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 1));
    return { start, end };
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

  private async validateLines(householdId: string, lines: TransactionLineDto[], acceptLanguage?: string) {
    const locale = resolveLocale(acceptLanguage);
    const parsedLines = lines
      .map((line) => ({
        ...line,
        amount: this.parseAmountToCents(line.amount),
      }))
      .filter((line) => line.amount !== null) as Array<Omit<TransactionLineDto, 'amount'> & { amount: bigint }>;

    if (parsedLines.length !== lines.length) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }

    const sum = parsedLines.reduce((acc, line) => acc + BigInt(line.amount), BigInt(0));
    if (sum !== BigInt(0)) {
      throw new BadRequestException({ message: t(locale, 'unbalanced') });
    }

    const accountIds = [...new Set(parsedLines.map((line) => line.accountId))];
    const accounts = await this.transactionsRepository.findAccountsByIds(accountIds);
    if (
      accounts.length !== accountIds.length ||
      accounts.some(
        (acc) => acc.householdId !== householdId || (!acc.isActive && !acc.name?.startsWith('__system__')),
      )
    ) {
      throw new BadRequestException({ message: t(locale, 'invalidReference') });
    }

    const categoryIds = [...new Set(parsedLines.map((line) => line.categoryId).filter(Boolean) as string[])];
    if (categoryIds.length) {
      const categories = await this.transactionsRepository.findCategoriesByIds(categoryIds);
      if (
        categories.length !== categoryIds.length ||
        categories.some((cat) => cat.householdId !== householdId || !cat.isActive)
      ) {
        throw new BadRequestException({ message: t(locale, 'invalidReference') });
      }
    }

    return parsedLines;
  }
}
