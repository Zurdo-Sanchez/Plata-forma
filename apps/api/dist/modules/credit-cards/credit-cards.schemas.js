"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCreditCardSchema = exports.CreateCreditCardSchema = exports.CreditCardIdSchema = void 0;
const zod_1 = require("zod");
exports.CreditCardIdSchema = zod_1.z.string().uuid();
exports.CreateCreditCardSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2).max(120),
    closingDay: zod_1.z.number().int().min(1).max(28),
    dueDay: zod_1.z.number().int().min(1).max(28),
    limitAmount: zod_1.z.string().trim().regex(/^\d+$/).optional(),
    accountId: zod_1.z.string().uuid().optional(),
});
exports.UpdateCreditCardSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(120).optional(),
    closingDay: zod_1.z.number().int().min(1).max(28).optional(),
    dueDay: zod_1.z.number().int().min(1).max(28).optional(),
    limitAmount: zod_1.z.string().trim().regex(/^\d+$/).optional(),
})
    .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });
//# sourceMappingURL=credit-cards.schemas.js.map