import { z } from 'zod';
export declare const LoanIdSchema: z.ZodString;
export declare const CreateLoanSchema: z.ZodObject<{
    name: z.ZodString;
    principalAmount: z.ZodString;
    interestRateBps: z.ZodNumber;
    startDate: z.ZodString;
    termMonths: z.ZodOptional<z.ZodNumber>;
    accountId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    principalAmount: string;
    interestRateBps: number;
    startDate: string;
    termMonths?: number | undefined;
    accountId?: string | undefined;
}, {
    name: string;
    principalAmount: string;
    interestRateBps: number;
    startDate: string;
    termMonths?: number | undefined;
    accountId?: string | undefined;
}>;
export declare const UpdateLoanSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    principalAmount: z.ZodOptional<z.ZodString>;
    interestRateBps: z.ZodOptional<z.ZodNumber>;
    startDate: z.ZodOptional<z.ZodString>;
    termMonths: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    principalAmount?: string | undefined;
    interestRateBps?: number | undefined;
    startDate?: string | undefined;
    termMonths?: number | undefined;
}, {
    name?: string | undefined;
    principalAmount?: string | undefined;
    interestRateBps?: number | undefined;
    startDate?: string | undefined;
    termMonths?: number | undefined;
}>, {
    name?: string | undefined;
    principalAmount?: string | undefined;
    interestRateBps?: number | undefined;
    startDate?: string | undefined;
    termMonths?: number | undefined;
}, {
    name?: string | undefined;
    principalAmount?: string | undefined;
    interestRateBps?: number | undefined;
    startDate?: string | undefined;
    termMonths?: number | undefined;
}>;
export type CreateLoanDto = z.infer<typeof CreateLoanSchema>;
export type UpdateLoanDto = z.infer<typeof UpdateLoanSchema>;
