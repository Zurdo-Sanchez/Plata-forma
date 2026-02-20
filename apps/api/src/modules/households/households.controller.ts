import { BadRequestException, Body, Controller, Delete, Get, Headers, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';
import { AddMemberSchema, CreateHouseholdSchema, HouseholdIdSchema, UpdateHouseholdSchema } from './households.schemas';
import { HouseholdsService } from './households.service';
import { resolveLocale, t } from './households.messages';

@Controller('households')
@UseGuards(AuthGuard)
export class HouseholdsController {
  constructor(private readonly householdsService: HouseholdsService) {}

  @Get()
  async list(@Req() request: AuthRequest) {
    return this.householdsService.list(request.user!.id);
  }

  @Post()
  async create(
    @Req() request: AuthRequest,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsed = CreateHouseholdSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const household = await this.householdsService.create(request.user!.id, parsed.data);
    return { ok: true, message: t(locale, 'created'), household };
  }

  @Get(':id')
  async get(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const parsedId = HouseholdIdSchema.safeParse(id);
    if (!parsedId.success) {
      const locale = resolveLocale(acceptLanguage);
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.householdsService.get(request.user!.id, parsedId.data, acceptLanguage);
  }

  @Patch(':id')
  async update(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = HouseholdIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const parsed = UpdateHouseholdSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const household = await this.householdsService.update(request.user!.id, parsedId.data, parsed.data, acceptLanguage);
    return { ok: true, message: t(locale, 'updated'), household };
  }

  @Post(':id/members')
  async addMember(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = HouseholdIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const parsed = AddMemberSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const member = await this.householdsService.addMember(
      request.user!.id,
      parsedId.data,
      parsed.data,
      acceptLanguage,
    );
    return { ok: true, message: t(locale, 'memberAdded'), member };
  }

  @Delete(':id')
  async remove(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = HouseholdIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    await this.householdsService.remove(request.user!.id, parsedId.data, acceptLanguage);
    return { ok: true, message: t(locale, 'deleted') };
  }
}
