import { BadRequestException, Body, Controller, Delete, Get, Headers, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';
import { AccountIdSchema, CreateAccountSchema, UpdateAccountSchema } from './accounts.schemas';
import { AccountsService } from './accounts.service';
import { resolveLocale, t } from './accounts.messages';

@Controller()
@UseGuards(AuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('households/:householdId/accounts')
  async list(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    return this.accountsService.list(request.user!.id, householdId, acceptLanguage);
  }

  @Post('households/:householdId/accounts')
  async create(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsed = CreateAccountSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const account = await this.accountsService.create(request.user!.id, householdId, parsed.data, acceptLanguage);
    return { ok: true, message: t(locale, 'created'), account };
  }

  @Get('accounts/:id')
  async get(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const parsedId = AccountIdSchema.safeParse(id);
    if (!parsedId.success) {
      const locale = resolveLocale(acceptLanguage);
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.accountsService.get(request.user!.id, parsedId.data, acceptLanguage);
  }

  @Patch('accounts/:id')
  async update(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = AccountIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const parsed = UpdateAccountSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const account = await this.accountsService.update(request.user!.id, parsedId.data, parsed.data, acceptLanguage);
    return { ok: true, message: t(locale, 'updated'), account };
  }

  @Delete('accounts/:id')
  async archive(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = AccountIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const account = await this.accountsService.archive(request.user!.id, parsedId.data, acceptLanguage);
    return { ok: true, message: t(locale, 'archived'), account };
  }
}
