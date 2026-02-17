"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const util_1 = require("util");
const prisma = new client_1.PrismaClient();
const scryptAsync = (0, util_1.promisify)(crypto_1.scrypt);
async function hashPassword(password) {
    const salt = (0, crypto_1.randomBytes)(16).toString('hex');
    const derivedKey = (await scryptAsync(password, salt, 64));
    return {
        hash: derivedKey.toString('hex'),
        salt,
    };
}
async function main() {
    const email = 'su@admin.com';
    const password = 'secret';
    const existing = await prisma.user.findUnique({ where: { email } });
    const { hash, salt } = await hashPassword(password);
    if (existing) {
        await prisma.user.update({
            where: { email },
            data: {
                passwordHash: hash,
                passwordSalt: salt,
                isSuperAdmin: true,
            },
        });
    }
    else {
        await prisma.user.create({
            data: {
                email,
                passwordHash: hash,
                passwordSalt: salt,
                isSuperAdmin: true,
            },
        });
    }
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map