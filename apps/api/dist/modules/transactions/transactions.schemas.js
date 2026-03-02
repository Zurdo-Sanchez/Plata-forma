"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsBalancesQuerySchema = exports.TransactionsQuerySchema = exports.UpdateTransactionSchema = exports.CreateTransactionSchema = exports.TransactionLineSchema = exports.TransactionIdSchema = void 0;
const zod_1 = require("zod");
exports.TransactionIdSchema = zod_1.z.string().uuid();
exports.TransactionLineSchema = zod_1.z.object({
    accountId: zod_1.z.string().uuid(),
    categoryId: zod_1.z.string().uuid().optional(),
    amount: zod_1.z.string().trim().regex(/^-?\d+(?:[.,]\d{1,2})?$/),
    memo: zod_1.z.string().trim().max(255).optional(),
});
const TransactionEntrySideSchema = zod_1.z.object({
    kind: zod_1.z.enum(['ACCOUNT', 'CATEGORY']),
    id: zod_1.z.string().uuid(),
});
exports.CreateTransactionSchema = zod_1.z.object({
    date: zod_1.z.string().trim().min(8),
    description: zod_1.z.string().trim().max(255).optional(),
    lines: zod_1.z.array(exports.TransactionLineSchema).min(2).optional(),
    entry: zod_1.z
        .object({
        from: TransactionEntrySideSchema,
        to: TransactionEntrySideSchema,
        amount: zod_1.z.string().trim().regex(/^\d+(?:[.,]\d{1,2})?$/),
        memo: zod_1.z.string().trim().max(255).optional(),
    })
        .optional(),
}).refine((value) => Boolean(value.lines || value.entry), { message: 'invalidBody' });
exports.UpdateTransactionSchema = zod_1.z
    .object({
    date: zod_1.z.string().trim().min(8).optional(),
    description: zod_1.z.string().trim().max(255).optional(),
    lines: zod_1.z.array(exports.TransactionLineSchema).min(2).optional(),
    entry: zod_1.z
        .object({
        from: TransactionEntrySideSchema,
        to: TransactionEntrySideSchema,
        amount: zod_1.z.string().trim().regex(/^\d+(?:[.,]\d{1,2})?$/),
        memo: zod_1.z.string().trim().max(255).optional(),
    })
        .optional(),
})
    .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });
exports.TransactionsQuerySchema = zod_1.z.object({
    from: zod_1.z.string().trim().min(8).optional(),
    to: zod_1.z.string().trim().min(8).optional(),
    accountId: zod_1.z.string().uuid().optional(),
    categoryId: zod_1.z.string().uuid().optional(),
    search: zod_1.z.string().trim().min(1).optional(),
    minAmount: zod_1.z.string().trim().regex(/^-?\d+(?:[.,]\d{1,2})?$/).optional(),
    maxAmount: zod_1.z.string().trim().regex(/^-?\d+(?:[.,]\d{1,2})?$/).optional(),
});
exports.TransactionsBalancesQuerySchema = zod_1.z.object({
    month: zod_1.z.string().trim().regex(/^\d{4}-\d{2}$/),
});
//# sourceMappingURL=transactions.schemas.js.map