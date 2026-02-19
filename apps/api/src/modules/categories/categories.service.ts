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
      type: payload.type,
      isActive: payload.isActive ?? true,
      household: { connect: { id: householdId } },
    });
  }

  async get(userId: string, categoryId: string, acceptLanguage?: string) {
    const category = await this.categoriesRepository.findById(categoryId);
    if (!category) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
    return category;
  }

  async update(userId: string, categoryId: string, payload: UpdateCategoryDto, acceptLanguage?: string) {
    const category = await this.categoriesRepository.findById(categoryId);
    if (!category) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
    return this.categoriesRepository.updateCategory(categoryId, {
      name: payload.name,
      type: payload.type,
      isActive: payload.isActive ?? category.isActive,
    });
  }

  async archive(userId: string, categoryId: string, acceptLanguage?: string) {
    const category = await this.categoriesRepository.findById(categoryId);
    if (!category) {
      const locale = resolveLocale(acceptLanguage);
      throw new NotFoundException({ message: t(locale, 'notFound') });
    }
    await this.householdsService.assertMember(userId, category.householdId, acceptLanguage);
    return this.categoriesRepository.updateCategory(categoryId, { isActive: false });
  }
}
