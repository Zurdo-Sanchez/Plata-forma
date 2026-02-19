"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.resolveLocale = void 0;
const i18n_1 = require("../../i18n");
Object.defineProperty(exports, "resolveLocale", { enumerable: true, get: function () { return i18n_1.resolveLocale; } });
const messages = {
    es: {
        invalidBody: 'Datos inválidos.',
        forbidden: 'No tienes acceso a esta cuenta.',
        notFound: 'Cuenta no encontrada.',
        created: 'Cuenta creada correctamente.',
        updated: 'Cuenta actualizada correctamente.',
        archived: 'Cuenta archivada correctamente.',
    },
    ca: {
        invalidBody: 'Dades invàlides.',
        forbidden: 'No tens accés a aquest compte.',
        notFound: 'Compte no trobat.',
        created: 'Compte creat correctament.',
        updated: 'Compte actualitzat correctament.',
        archived: 'Compte arxivat correctament.',
    },
    en: {
        invalidBody: 'Invalid data.',
        forbidden: 'You do not have access to this account.',
        notFound: 'Account not found.',
        created: 'Account created successfully.',
        updated: 'Account updated successfully.',
        archived: 'Account archived successfully.',
    },
};
const t = (locale, key) => (0, i18n_1.t)(messages, locale, key);
exports.t = t;
//# sourceMappingURL=accounts.messages.js.map