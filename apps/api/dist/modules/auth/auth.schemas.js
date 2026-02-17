"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
const passwordSchema = zod_1.z.string().min(6);
exports.RegisterSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email(),
    password: passwordSchema,
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email(),
    password: passwordSchema,
});
//# sourceMappingURL=auth.schemas.js.map