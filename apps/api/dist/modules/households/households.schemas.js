"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMemberSchema = exports.UpdateHouseholdSchema = exports.CreateHouseholdSchema = exports.HouseholdIdSchema = void 0;
const zod_1 = require("zod");
exports.HouseholdIdSchema = zod_1.z.string().uuid();
exports.CreateHouseholdSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2).max(120),
    currency: zod_1.z.string().trim().length(3).optional(),
});
exports.UpdateHouseholdSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(120).optional(),
    currency: zod_1.z.string().trim().length(3).optional(),
})
    .refine((value) => value.name || value.currency, { message: 'invalidBody' });
exports.AddMemberSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email(),
    role: zod_1.z.enum(['OWNER', 'MEMBER']).optional(),
});
//# sourceMappingURL=households.schemas.js.map