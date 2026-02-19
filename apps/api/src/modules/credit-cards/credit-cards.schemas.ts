import { z } from 'zod';

export const CreditCardIdSchema = z.string().uuid();

export const CreateCreditCardSchema = z.object({
  name: z.string().trim().min(2).max(120),
  closingDay: z.number().int().min(1).max(28),
  dueDay: z.number().int().min(1).max(28),
  limitAmount: z.string().trim().regex(/^\d+$/).optional(),
  accountId: z.string().uuid().optional(),
});

export const UpdateCreditCardSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    closingDay: z.number().int().min(1).max(28).optional(),
    dueDay: z.number().int().min(1).max(28).optional(),
    limitAmount: z.string().trim().regex(/^\d+$/).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });

export type CreateCreditCardDto = z.infer<typeof CreateCreditCardSchema>;
export type UpdateCreditCardDto = z.infer<typeof UpdateCreditCardSchema>;
