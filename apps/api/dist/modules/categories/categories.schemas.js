"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategorySchema = exports.CreateCategorySchema = exports.CategoryIdSchema = void 0;
const zod_1 = require("zod");
exports.CategoryIdSchema = zod_1.z.string().uuid();
exports.CreateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2).max(120),
    type: zod_1.z.enum(['INCOME', 'EXPENSE', 'TRANSFER']),
    isActive: zod_1.z.boolean().optional(),
});
exports.UpdateCategorySchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(120).optional(),
    type: zod_1.z.enum(['INCOME', 'EXPENSE', 'TRANSFER']).optional(),
    isActive: zod_1.z.boolean().optional(),
})
    .refine((value) => Object.keys(value).length > 0, { message: 'invalidBody' });
//# sourceMappingURL=categories.schemas.js.map