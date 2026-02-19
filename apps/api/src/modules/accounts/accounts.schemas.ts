import { z } from 'zod';

export const AccountIdSchema = z.string().uuid();

export const CreateAccountSchema = z.object({
  name: z.string().trim().min(2).max(120),
  type: z.enum(['BANK', 'CASH', 'CREDIT_CARD', 'LOAN']),
  currency: z.string().trim().length(3).optional(),
  isActive: z.boolean().optional(),
});

export const UpdateAccountSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    type: z.enum(['BANK', 'CASH', 'CREDIT_CARD', 'LOAN']).optional(),
    currency: z.string().trim().length(3).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });

export type CreateAccountDto = z.infer<typeof CreateAccountSchema>;
export type UpdateAccountDto = z.infer<typeof UpdateAccountSchema>;
