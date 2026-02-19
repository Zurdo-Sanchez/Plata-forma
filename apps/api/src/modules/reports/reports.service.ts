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

    const [categorySums, accountSums] = await Promise.all([
      this.reportsRepository.sumByCategory(householdId, start, end),
      this.reportsRepository.sumByAccount(householdId, start, end),
    ]);

    const categoryIds = categorySums.map((item) => item.categoryId).filter(Boolean) as string[];
    const accountIds = accountSums.map((item) => item.accountId).filter(Boolean) as string[];

    const [categories, accounts] = await Promise.all([
      this.reportsRepository.findCategoriesByIds(categoryIds),
      this.reportsRepository.findAccountsByIds(accountIds),
    ]);

    const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));
    const accountMap = new Map(accounts.map((acc) => [acc.id, acc]));

    const byCategory = categorySums.map((item) => {
      const category = item.categoryId ? categoryMap.get(item.categoryId) : null;
      return {
        categoryId: item.categoryId,
        name: category?.name ?? t(locale, 'uncategorized'),
        type: category?.type ?? null,
        amount: item._sum.amount ?? BigInt(0),
      };
    });

    const byAccount = accountSums.map((item) => {
      const account = accountMap.get(item.accountId);
      return {
        accountId: item.accountId,
        name: account?.name ?? '',
        type: account?.type ?? null,
        amount: item._sum.amount ?? BigInt(0),
      };
    });

    const totals = byCategory.reduce(
      (acc, item) => {
        if (item.type === 'INCOME') acc.income += item.amount;
        if (item.type === 'EXPENSE') acc.expense += item.amount;
        return acc;
      },
      { income: BigInt(0), expense: BigInt(0) },
    );

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
}
