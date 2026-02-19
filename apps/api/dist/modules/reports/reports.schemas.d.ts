import { z } from 'zod';
export declare const MonthlyReportQuerySchema: z.ZodObject<{
    month: z.ZodString;
}, "strip", z.ZodTypeAny, {
    month: string;
}, {
    month: string;
}>;
export type MonthlyReportQueryDto = z.infer<typeof MonthlyReportQuerySchema>;
