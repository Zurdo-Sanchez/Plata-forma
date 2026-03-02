import { z } from 'zod';
export declare const CategoryIdSchema: z.ZodString;
export declare const CreateCategorySchema: z.ZodObject<{
    name: z.ZodString;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    isActive?: boolean | undefined;
}, {
    name: string;
    isActive?: boolean | undefined;
}>;
export declare const UpdateCategorySchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    isActive?: boolean | undefined;
}>, {
    name?: string | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    isActive?: boolean | undefined;
}>;
export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
