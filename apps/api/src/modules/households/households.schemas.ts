import { z } from 'zod';

export const HouseholdIdSchema = z.string().uuid();

export const CreateHouseholdSchema = z.object({
  name: z.string().trim().min(2).max(120),
  currency: z.string().trim().length(3).optional(),
});

export const UpdateHouseholdSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    currency: z.string().trim().length(3).optional(),
  })
  .refine((value) => value.name || value.currency, { message: 'invalidBody' });

export const AddMemberSchema = z.object({
  email: z.string().trim().email(),
  role: z.enum(['OWNER', 'MEMBER']).optional(),
});

export type CreateHouseholdDto = z.infer<typeof CreateHouseholdSchema>;
export type UpdateHouseholdDto = z.infer<typeof UpdateHouseholdSchema>;
export type AddMemberDto = z.infer<typeof AddMemberSchema>;
