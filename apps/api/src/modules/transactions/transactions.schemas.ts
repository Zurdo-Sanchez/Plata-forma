import { z } from 'zod';

export const TransactionIdSchema = z.string().uuid();

export const TransactionLineSchema = z.object({
  accountId: z.string().uuid(),
  categoryId: z.string().uuid().optional(),
  amount: z.string().trim().regex(/^-?\d+$/),
  memo: z.string().trim().max(255).optional(),
});

export const CreateTransactionSchema = z.object({
  date: z.string().trim().min(8),
  description: z.string().trim().max(255).optional(),
  lines: z.array(TransactionLineSchema).min(2).optional(),
  entry: z
    .object({
      accountId: z.string().uuid(),
      categoryId: z.string().uuid(),
      amount: z.string().trim().regex(/^\d+$/),
      type: z.enum(['INCOME', 'EXPENSE']),
      memo: z.string().trim().max(255).optional(),
    })
    .optional(),
}).refine((value) => Boolean(value.lines || value.entry), { message: 'invalidBody' });

export const UpdateTransactionSchema = z
  .object({
    date: z.string().trim().min(8).optional(),
    description: z.string().trim().max(255).optional(),
    lines: z.array(TransactionLineSchema).min(2).optional(),
    entry: z
      .object({
        accountId: z.string().uuid(),
        categoryId: z.string().uuid(),
        amount: z.string().trim().regex(/^\d+$/),
        type: z.enum(['INCOME', 'EXPENSE']),
        memo: z.string().trim().max(255).optional(),
      })
      .optional(),
  })
  .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });

export const TransactionsQuerySchema = z.object({
  from: z.string().trim().min(8).optional(),
  to: z.string().trim().min(8).optional(),
  accountId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  search: z.string().trim().min(1).optional(),
  minAmount: z.string().trim().regex(/^-?\d+$/).optional(),
  maxAmount: z.string().trim().regex(/^-?\d+$/).optional(),
});

export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof UpdateTransactionSchema>;
export type TransactionLineDto = z.infer<typeof TransactionLineSchema>;
export type TransactionsQueryDto = z.infer<typeof TransactionsQuerySchema>;
