"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsQuerySchema = exports.UpdateTransactionSchema = exports.CreateTransactionSchema = exports.TransactionLineSchema = exports.TransactionIdSchema = void 0;
const zod_1 = require("zod");
exports.TransactionIdSchema = zod_1.z.string().uuid();
exports.TransactionLineSchema = zod_1.z.object({
    accountId: zod_1.z.string().uuid(),
    categoryId: zod_1.z.string().uuid().optional(),
    amount: zod_1.z.string().trim().regex(/^-?\d+$/),
    memo: zod_1.z.string().trim().max(255).optional(),
});
exports.CreateTransactionSchema = zod_1.z.object({
    date: zod_1.z.string().trim().min(8),
    description: zod_1.z.string().trim().max(255).optional(),
    lines: zod_1.z.array(exports.TransactionLineSchema).min(2),
});
exports.UpdateTransactionSchema = zod_1.z
    .object({
    date: zod_1.z.string().trim().min(8).optional(),
    description: zod_1.z.string().trim().max(255).optional(),
    lines: zod_1.z.array(exports.TransactionLineSchema).min(2).optional(),
})
    .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });
exports.TransactionsQuerySchema = zod_1.z.object({
    from: zod_1.z.string().trim().min(8).optional(),
    to: zod_1.z.string().trim().min(8).optional(),
    accountId: zod_1.z.string().uuid().optional(),
    categoryId: zod_1.z.string().uuid().optional(),
    search: zod_1.z.string().trim().min(1).optional(),
    minAmount: zod_1.z.string().trim().regex(/^-?\d+$/).optional(),
    maxAmount: zod_1.z.string().trim().regex(/^-?\d+$/).optional(),
});
//# sourceMappingURL=transactions.schemas.js.map