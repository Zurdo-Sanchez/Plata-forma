import { BadRequestException, Body, Controller, Get, Headers, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';
import { CreditCardsService } from './credit-cards.service';
import { CreateCreditCardSchema, CreditCardIdSchema, UpdateCreditCardSchema } from './credit-cards.schemas';
import { resolveLocale, t } from './credit-cards.messages';

@Controller()
@UseGuards(AuthGuard)
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Get('households/:householdId/credit-cards')
  async list(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    return this.creditCardsService.list(request.user!.id, householdId, acceptLanguage);
  }

  @Post('households/:householdId/credit-cards')
  async create(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsed = CreateCreditCardSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const card = await this.creditCardsService.create(request.user!.id, householdId, parsed.data, acceptLanguage);
    return { ok: true, message: t(locale, 'created'), card };
  }

  @Get('credit-cards/:id')
  async get(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const parsedId = CreditCardIdSchema.safeParse(id);
    if (!parsedId.success) {
      const locale = resolveLocale(acceptLanguage);
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.creditCardsService.get(request.user!.id, parsedId.data, acceptLanguage);
  }

  @Patch('credit-cards/:id')
  async update(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = CreditCardIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const parsed = UpdateCreditCardSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const card = await this.creditCardsService.update(request.user!.id, parsedId.data, parsed.data, acceptLanguage);
    return { ok: true, message: t(locale, 'updated'), card };
  }
}
