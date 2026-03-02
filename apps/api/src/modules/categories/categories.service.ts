import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.schemas';
import { CategoriesRepository } from './categories.repository';
import { HouseholdsService } from '../households/households.service';
import { resolveLocale, t } from './categories.messages';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly householdsService: HouseholdsService,
  ) {}

  async list(userId: string, householdId: string, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    return this.categoriesRepository.listByHousehold(householdId);
  }

  async create(userId: string, householdId: string, payload: CreateCategoryDto, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    return this.categoriesRepository.createCategory({
      name: payload.name,
      isActive: payload.isActive ?? true,
      household: { connect: { id: householdId } },
    });
  }

  async get(userId: string, categoryId: string, acceptLanguage?: string) {
    const category = await this.categoriesRepository.findById(categoryId);
    if (!category || !category.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
    return category;
  }

  async update(userId: string, categoryId: string, payload: UpdateCategoryDto, acceptLanguage?: string) {
    const category = await this.categoriesRepository.findById(categoryId);
    if (!category || !category.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
    return this.categoriesRepository.updateCategory(categoryId, {
      name: payload.name,
      isActive: payload.isActive ?? category.isActive,
    });
  }

  async archive(userId: string, categoryId: string, acceptLanguage?: string) {
    const category = await this.categoriesRepository.findById(categoryId);
    if (!category || !category.isActive) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
    return this.categoriesRepository.updateCategory(categoryId, { isActive: false });
  }

  async balances(userId: string, householdId: string, month: string, acceptLanguage?: string) {
    await this.householdsService.assertMember(userId, householdId, acceptLanguage);
    const locale = resolveLocale(acceptLanguage);
    const { start, end } = this.parseMonth(month);
    if (!start || !end) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }

    const yearStart = new Date(Date.UTC(start.getUTCFullYear(), 0, 1));
    const yearEnd = new Date(Date.UTC(start.getUTCFullYear() + 1, 0, 1));

    const [monthSums, yearSums] = await Promise.all([
      this.categoriesRepository.sumByCategoryForRange(householdId, start, end),
      this.categoriesRepository.sumByCategoryForRange(householdId, yearStart, yearEnd),
    ]);

    const monthly: Record<string, bigint> = {};
    const yearly: Record<string, bigint> = {};

    for (const item of monthSums) {
      if (!item.categoryId) continue;
      monthly[item.categoryId] = item._sum.amount ?? BigInt(0);
    }

    for (const item of yearSums) {
      if (!item.categoryId) continue;
      yearly[item.categoryId] = item._sum.amount ?? BigInt(0);
    }

    return { month, monthly, yearly };
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
