import { BadRequestException, Body, Controller, Delete, Get, Headers, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';
import { CategoriesService } from './categories.service';
import { CategoryIdSchema, CreateCategorySchema, UpdateCategorySchema } from './categories.schemas';
import { resolveLocale, t } from './categories.messages';

@Controller()
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('households/:householdId/categories')
  async list(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    return this.categoriesService.list(request.user!.id, householdId, acceptLanguage);
  }

  @Post('households/:householdId/categories')
  async create(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsed = CreateCategorySchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const category = await this.categoriesService.create(request.user!.id, householdId, parsed.data, acceptLanguage);
    return { ok: true, message: t(locale, 'created'), category };
  }

  @Get('categories/:id')
  async get(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const parsedId = CategoryIdSchema.safeParse(id);
    if (!parsedId.success) {
      const locale = resolveLocale(acceptLanguage);
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.categoriesService.get(request.user!.id, parsedId.data, acceptLanguage);
  }

  @Patch('categories/:id')
  async update(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = CategoryIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const parsed = UpdateCategorySchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const category = await this.categoriesService.update(request.user!.id, parsedId.data, parsed.data, acceptLanguage);
    return { ok: true, message: t(locale, 'updated'), category };
  }

  @Delete('categories/:id')
  async archive(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = CategoryIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const category = await this.categoriesService.archive(request.user!.id, parsedId.data, acceptLanguage);
    return { ok: true, message: t(locale, 'archived'), category };
  }
}
