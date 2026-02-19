"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccountSchema = exports.CreateAccountSchema = exports.AccountIdSchema = void 0;
const zod_1 = require("zod");
exports.AccountIdSchema = zod_1.z.string().uuid();
exports.CreateAccountSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2).max(120),
    type: zod_1.z.enum(['BANK', 'CASH', 'CREDIT_CARD', 'LOAN']),
    currency: zod_1.z.string().trim().length(3).optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.UpdateAccountSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(120).optional(),
    type: zod_1.z.enum(['BANK', 'CASH', 'CREDIT_CARD', 'LOAN']).optional(),
    currency: zod_1.z.string().trim().length(3).optional(),
    isActive: zod_1.z.boolean().optional(),
})
    .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });
//# sourceMappingURL=accounts.schemas.js.map