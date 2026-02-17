"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const crypto_1 = require("crypto");
const util_1 = require("util");
const scryptAsync = (0, util_1.promisify)(crypto_1.scrypt);
async function hashPassword(password) {
    const salt = (0, crypto_1.randomBytes)(16).toString('hex');
    const derivedKey = (await scryptAsync(password, salt, 64));
    return {
        hash: derivedKey.toString('hex'),
        salt,
    };
}
async function verifyPassword(password, salt, hash) {
    const derivedKey = (await scryptAsync(password, salt, 64));
    const hashBuffer = Buffer.from(hash, 'hex');
    if (hashBuffer.length !== derivedKey.length) {
        return false;
    }
    return (0, crypto_1.timingSafeEqual)(hashBuffer, derivedKey);
}
//# sourceMappingURL=auth.crypto.js.map