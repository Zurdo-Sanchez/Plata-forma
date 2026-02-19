"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLoanSchema = exports.CreateLoanSchema = exports.LoanIdSchema = void 0;
const zod_1 = require("zod");
exports.LoanIdSchema = zod_1.z.string().uuid();
exports.CreateLoanSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2).max(120),
    principalAmount: zod_1.z.string().trim().regex(/^\d+$/),
    interestRateBps: zod_1.z.number().int().min(0),
    startDate: zod_1.z.string().trim().min(8),
    termMonths: zod_1.z.number().int().min(1).optional(),
    accountId: zod_1.z.string().uuid().optional(),
});
exports.UpdateLoanSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(120).optional(),
    principalAmount: zod_1.z.string().trim().regex(/^\d+$/).optional(),
    interestRateBps: zod_1.z.number().int().min(0).optional(),
    startDate: zod_1.z.string().trim().min(8).optional(),
    termMonths: zod_1.z.number().int().min(1).optional(),
})
    .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });
//# sourceMappingURL=loans.schemas.js.map