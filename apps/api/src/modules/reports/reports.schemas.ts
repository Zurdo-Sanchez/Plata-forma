import { z } from 'zod';

export const MonthlyReportQuerySchema = z.object({
  month: z.string().trim().regex(/^\d{4}-\d{2}$/),
});

export type MonthlyReportQueryDto = z.infer<typeof MonthlyReportQuerySchema>;
