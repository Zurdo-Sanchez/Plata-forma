import { z } from 'zod';
export declare const CategoryIdSchema: z.ZodString;
export declare const CreateCategorySchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["INCOME", "EXPENSE", "TRANSFER"]>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "INCOME" | "EXPENSE" | "TRANSFER";
    isActive?: boolean | undefined;
}, {
    name: string;
    type: "INCOME" | "EXPENSE" | "TRANSFER";
    isActive?: boolean | undefined;
}>;
export declare const UpdateCategorySchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["INCOME", "EXPENSE", "TRANSFER"]>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    type?: "INCOME" | "EXPENSE" | "TRANSFER" | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    type?: "INCOME" | "EXPENSE" | "TRANSFER" | undefined;
    isActive?: boolean | undefined;
}>, {
    name?: string | undefined;
    type?: "INCOME" | "EXPENSE" | "TRANSFER" | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    type?: "INCOME" | "EXPENSE" | "TRANSFER" | undefined;
    isActive?: boolean | undefined;
}>;
export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
