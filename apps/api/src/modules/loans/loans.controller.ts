import { BadRequestException, Body, Controller, Get, Headers, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';
import { CreateLoanSchema, LoanIdSchema, UpdateLoanSchema } from './loans.schemas';
import { LoansService } from './loans.service';
import { resolveLocale, t } from './loans.messages';

@Controller()
@UseGuards(AuthGuard)
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get('households/:householdId/loans')
  async list(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    return this.loansService.list(request.user!.id, householdId, acceptLanguage);
  }

  @Post('households/:householdId/loans')
  async create(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsed = CreateLoanSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const loan = await this.loansService.create(request.user!.id, householdId, parsed.data, acceptLanguage);
    return { ok: true, message: t(locale, 'created'), loan };
  }

  @Get('loans/:id')
  async get(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const parsedId = LoanIdSchema.safeParse(id);
    if (!parsedId.success) {
      const locale = resolveLocale(acceptLanguage);
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.loansService.get(request.user!.id, parsedId.data, acceptLanguage);
  }

  @Patch('loans/:id')
  async update(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Body() body: unknown,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const locale = resolveLocale(acceptLanguage);
    const parsedId = LoanIdSchema.safeParse(id);
    if (!parsedId.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const parsed = UpdateLoanSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    const loan = await this.loansService.update(request.user!.id, parsedId.data, parsed.data, acceptLanguage);
    return { ok: true, message: t(locale, 'updated'), loan };
  }
}
