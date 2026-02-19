import { z } from 'zod';

export const LoanIdSchema = z.string().uuid();

export const CreateLoanSchema = z.object({
  name: z.string().trim().min(2).max(120),
  principalAmount: z.string().trim().regex(/^\d+$/),
  interestRateBps: z.number().int().min(0),
  startDate: z.string().trim().min(8),
  termMonths: z.number().int().min(1).optional(),
  accountId: z.string().uuid().optional(),
});

export const UpdateLoanSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    principalAmount: z.string().trim().regex(/^\d+$/).optional(),
    interestRateBps: z.number().int().min(0).optional(),
    startDate: z.string().trim().min(8).optional(),
    termMonths: z.number().int().min(1).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });

export type CreateLoanDto = z.infer<typeof CreateLoanSchema>;
export type UpdateLoanDto = z.infer<typeof UpdateLoanSchema>;
