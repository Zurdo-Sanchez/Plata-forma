import { BadRequestException, Injectable } from '@nestjs/common';
import { HouseholdsService } from '../households/households.service';
import { ReportsRepository } from './reports.repository';
import { MonthlyReportQueryDto } from './reports.schemas';
import { resolveLocale, t } from './reports.messages';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly householdsService: HouseholdsService,
  ) {}

  async monthly(userId: string, householdId: string, query: MonthlyReportQueryDto, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    const locale = resolveLocale(acceptLanguage);

    const { start, end } = this.parseMonth(query.month);
    if (!start || !end) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }

    const rangeStart = this.addMonths(start, -1);
    const [transactions, accountSums] = await Promise.all([
      this.reportsRepository.listTransactionsForReport(householdId, rangeStart, end),
      this.reportsRepository.sumByAccount(householdId, start, end),
    ]);

    const accountIds = accountSums.map((item) => item.accountId).filter(Boolean) as string[];
    const accounts = await this.reportsRepository.findAccountsByIds(accountIds);
    const accountMap = new Map(accounts.map((acc) => [acc.id, acc]));

    const targetMonthKey = this.toMonthKey(start);
    const byCategoryMap = new Map<string | null, { categoryId: string | null; name: string; amount: bigint }>();
    const totals = { income: BigInt(0), expense: BigInt(0) };

    for (const transaction of transactions) {
      const baseMonthKey = this.toMonthKey(transaction.date);
      const hasCreditCard = transaction.lines.some((line) => line.account?.type === 'CREDIT_CARD');

      for (const line of transaction.lines) {
        const shouldShift = Boolean(line.categoryId && hasCreditCard);
        const effectiveMonthKey = baseMonthKey + (shouldShift ? 1 : 0);
        if (effectiveMonthKey !== targetMonthKey) continue;

        const isSystem = this.isSystemAccount(line.account?.name);
        const rawAmount = BigInt(line.amount ?? 0);
        const effectiveAmount = isSystem ? -rawAmount : rawAmount;

        const key = line.categoryId ?? null;
        const existing = byCategoryMap.get(key);
        const name = line.category?.name ?? t(locale, 'uncategorized');
        const nextAmount = existing ? existing.amount + effectiveAmount : effectiveAmount;

        byCategoryMap.set(key, {
          categoryId: key,
          name,
          amount: nextAmount,
        });

        if (line.categoryId) {
          if (effectiveAmount >= BigInt(0)) {
            totals.income += effectiveAmount;
          } else {
            totals.expense += -effectiveAmount;
          }
        }
      }
    }

    const byCategory = Array.from(byCategoryMap.values());
    const byAccount = accountSums.map((item) => {
      const account = accountMap.get(item.accountId);
      return {
        accountId: item.accountId,
        name: account?.name ?? '',
        type: account?.type ?? null,
        amount: item._sum.amount ?? BigInt(0),
      };
    });

    return {
      month: query.month,
      range: { start, end },
      totals: {
        income: totals.income,
        expense: totals.expense,
        net: totals.income - totals.expense,
      },
      byCategory,
      byAccount,
    };
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

  private toMonthKey(value: Date) {
    return value.getUTCFullYear() * 12 + value.getUTCMonth();
  }

  private addMonths(value: Date, offset: number) {
    return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + offset, 1));
  }

  private isSystemAccount(name?: string | null) {
    return Boolean(name && name.startsWith('__system__'));
  }
}
