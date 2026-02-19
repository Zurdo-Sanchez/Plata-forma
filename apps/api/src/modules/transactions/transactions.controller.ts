import { BadRequestException, Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';
import {
  CreateTransactionSchema,
  TransactionIdSchema,
  TransactionsQuerySchema,
  UpdateTransactionSchema,
} from './transactions.schemas';
import { TransactionsService } from './transactions.service';
import { resolveLocale, t } from './transactions.messages';

@Controller()
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('households/:householdId/transactions')
  async list(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Query() query: Record<string, string>,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const parsed = TransactionsQuerySchema.safeParse(query);
    if (!parsed.success) {
      const locale = resolveLocale(acceptLanguage);
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.transactionsService.list(request.user!.id, householdId, parsed.data, acceptLanguage);
  }

  @Post('households/:householdId/transactions')
  async create(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsed = CreateTransactionSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const transaction = await this.transactionsService.create(
      request.user!.id,
      householdId,
      parsed.data,
      acceptLanguage,
    );
    return { ok: true, message: t(locale, 'created'), transaction };
  }

  @Get('transactions/:id')
  async get(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const parsedId = TransactionIdSchema.safeParse(id);
    if (!parsedId.success) {
      const locale = resolveLocale(acceptLanguage);
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.transactionsService.get(request.user!.id, parsedId.data, acceptLanguage);
  }

  @Patch('transactions/:id')
  async update(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = TransactionIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const parsed = UpdateTransactionSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const transaction = await this.transactionsService.update(
      request.user!.id,
      parsedId.data,
      parsed.data,
      acceptLanguage,
    );
    return { ok: true, message: t(locale, 'updated'), transaction };
  }

  @Delete('transactions/:id')
  async remove(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = TransactionIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const transaction = await this.transactionsService.remove(request.user!.id, parsedId.data, acceptLanguage);
    return { ok: true, message: t(locale, 'deleted'), transaction };
  }
}
