import { z } from 'zod';
export declare const HouseholdIdSchema: z.ZodString;
export declare const CreateHouseholdSchema: z.ZodObject<{
    name: z.ZodString;
    currency: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    currency?: string | undefined;
}, {
    name: string;
    currency?: string | undefined;
}>;
export declare const UpdateHouseholdSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    currency?: string | undefined;
}, {
    name?: string | undefined;
    currency?: string | undefined;
}>, {
    name?: string | undefined;
    currency?: string | undefined;
}, {
    name?: string | undefined;
    currency?: string | undefined;
}>;
export declare const AddMemberSchema: z.ZodObject<{
    email: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<["OWNER", "MEMBER"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    role?: "OWNER" | "MEMBER" | undefined;
}, {
    email: string;
    role?: "OWNER" | "MEMBER" | undefined;
}>;
export type CreateHouseholdDto = z.infer<typeof CreateHouseholdSchema>;
export type UpdateHouseholdDto = z.infer<typeof UpdateHouseholdSchema>;
export type AddMemberDto = z.infer<typeof AddMemberSchema>;
