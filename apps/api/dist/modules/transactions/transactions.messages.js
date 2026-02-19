"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.resolveLocale = void 0;
const i18n_1 = require("../../i18n");
Object.defineProperty(exports, "resolveLocale", { enumerable: true, get: function () { return i18n_1.resolveLocale; } });
const messages = {
    es: {
        invalidBody: 'Datos inválidos.',
        forbidden: 'No tienes acceso a esta transacción.',
        notFound: 'Transacción no encontrada.',
        unbalanced: 'La suma de las líneas debe ser 0.',
        invalidReference: 'Cuenta o categoría inválida.',
        created: 'Transacción creada correctamente.',
        updated: 'Transacción actualizada correctamente.',
        deleted: 'Transacción eliminada correctamente.',
    },
    ca: {
        invalidBody: 'Dades invàlides.',
        forbidden: 'No tens accés a aquesta transacció.',
        notFound: 'Transacció no trobada.',
        unbalanced: 'La suma de les línies ha de ser 0.',
        invalidReference: 'Compte o categoria invàlida.',
        created: 'Transacció creada correctament.',
        updated: 'Transacció actualitzada correctament.',
        deleted: 'Transacció eliminada correctament.',
    },
    en: {
        invalidBody: 'Invalid data.',
        forbidden: 'You do not have access to this transaction.',
        notFound: 'Transaction not found.',
        unbalanced: 'The sum of the lines must be 0.',
        invalidReference: 'Invalid account or category.',
        created: 'Transaction created successfully.',
        updated: 'Transaction updated successfully.',
        deleted: 'Transaction deleted successfully.',
    },
};
const t = (locale, key) => (0, i18n_1.t)(messages, locale, key);
exports.t = t;
//# sourceMappingURL=transactions.messages.js.map