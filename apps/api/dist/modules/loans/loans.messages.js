"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.resolveLocale = void 0;
const i18n_1 = require("../../i18n");
Object.defineProperty(exports, "resolveLocale", { enumerable: true, get: function () { return i18n_1.resolveLocale; } });
const messages = {
    es: {
        invalidBody: 'Datos inválidos.',
        forbidden: 'No tienes acceso a este préstamo.',
        notFound: 'Préstamo no encontrado.',
        invalidAccount: 'Cuenta inválida para préstamo.',
        created: 'Préstamo creado correctamente.',
        updated: 'Préstamo actualizado correctamente.',
    },
    ca: {
        invalidBody: 'Dades invàlides.',
        forbidden: 'No tens accés a aquest préstec.',
        notFound: 'Préstec no trobat.',
        invalidAccount: 'Compte invàlid per al préstec.',
        created: 'Préstec creat correctament.',
        updated: 'Préstec actualitzat correctament.',
    },
    en: {
        invalidBody: 'Invalid data.',
        forbidden: 'You do not have access to this loan.',
        notFound: 'Loan not found.',
        invalidAccount: 'Invalid account for loan.',
        created: 'Loan created successfully.',
        updated: 'Loan updated successfully.',
    },
};
const t = (locale, key) => (0, i18n_1.t)(messages, locale, key);
exports.t = t;
//# sourceMappingURL=loans.messages.js.map