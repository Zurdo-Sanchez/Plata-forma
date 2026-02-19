import { z } from 'zod';
export declare const AccountIdSchema: z.ZodString;
export declare const CreateAccountSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["BANK", "CASH", "CREDIT_CARD", "LOAN"]>;
    currency: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "BANK" | "CASH" | "CREDIT_CARD" | "LOAN";
    currency?: string | undefined;
    isActive?: boolean | undefined;
}, {
    name: string;
    type: "BANK" | "CASH" | "CREDIT_CARD" | "LOAN";
    currency?: string | undefined;
    isActive?: boolean | undefined;
}>;
export declare const UpdateAccountSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["BANK", "CASH", "CREDIT_CARD", "LOAN"]>>;
    currency: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    type?: "BANK" | "CASH" | "CREDIT_CARD" | "LOAN" | undefined;
    currency?: string | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    type?: "BANK" | "CASH" | "CREDIT_CARD" | "LOAN" | undefined;
    currency?: string | undefined;
    isActive?: boolean | undefined;
}>, {
    name?: string | undefined;
    type?: "BANK" | "CASH" | "CREDIT_CARD" | "LOAN" | undefined;
    currency?: string | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    type?: "BANK" | "CASH" | "CREDIT_CARD" | "LOAN" | undefined;
    currency?: string | undefined;
    isActive?: boolean | undefined;
}>;
export type CreateAccountDto = z.infer<typeof CreateAccountSchema>;
export type UpdateAccountDto = z.infer<typeof UpdateAccountSchema>;
