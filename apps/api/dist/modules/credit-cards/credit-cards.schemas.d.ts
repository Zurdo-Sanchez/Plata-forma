import { z } from 'zod';
export declare const CreditCardIdSchema: z.ZodString;
export declare const CreateCreditCardSchema: z.ZodObject<{
    name: z.ZodString;
    closingDay: z.ZodNumber;
    dueDay: z.ZodNumber;
    limitAmount: z.ZodOptional<z.ZodString>;
    accountId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    closingDay: number;
    dueDay: number;
    limitAmount?: string | undefined;
    accountId?: string | undefined;
}, {
    name: string;
    closingDay: number;
    dueDay: number;
    limitAmount?: string | undefined;
    accountId?: string | undefined;
}>;
export declare const UpdateCreditCardSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    closingDay: z.ZodOptional<z.ZodNumber>;
    dueDay: z.ZodOptional<z.ZodNumber>;
    limitAmount: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    closingDay?: number | undefined;
    dueDay?: number | undefined;
    limitAmount?: string | undefined;
}, {
    name?: string | undefined;
    closingDay?: number | undefined;
    dueDay?: number | undefined;
    limitAmount?: string | undefined;
}>, {
    name?: string | undefined;
    closingDay?: number | undefined;
    dueDay?: number | undefined;
    limitAmount?: string | undefined;
}, {
    name?: string | undefined;
    closingDay?: number | undefined;
    dueDay?: number | undefined;
    limitAmount?: string | undefined;
}>;
export type CreateCreditCardDto = z.infer<typeof CreateCreditCardSchema>;
export type UpdateCreditCardDto = z.infer<typeof UpdateCreditCardSchema>;
