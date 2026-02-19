import { BadRequestException, Controller, Get, Headers, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, AuthRequest } from '../auth/auth.guard';
import { MonthlyReportQuerySchema } from './reports.schemas';
import { ReportsService } from './reports.service';
import { resolveLocale, t } from './reports.messages';

@Controller()
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('households/:householdId/reports/monthly')
  async monthly(
    @Req() request: AuthRequest,
    @Param('householdId') householdId: string,
    @Query() query: Record<string, string>,
    @Headers('accept-language') acceptLanguage?: string,
  ) {
    const parsed = MonthlyReportQuerySchema.safeParse(query);
    if (!parsed.success) {
      const locale = resolveLocale(acceptLanguage);
      throw new BadRequestException({ message: t(locale, 'invalidBody') });
    }
    return this.reportsService.monthly(request.user!.id, householdId, parsed.data, acceptLanguage);
  }
}
