"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.resolveLocale = void 0;
const i18n_1 = require("../../i18n");
Object.defineProperty(exports, "resolveLocale", { enumerable: true, get: function () { return i18n_1.resolveLocale; } });
const messages = {
    es: {
        invalidBody: 'Datos inválidos.',
        forbidden: 'No tienes acceso a esta tarjeta.',
        notFound: 'Tarjeta no encontrada.',
        invalidAccount: 'Cuenta inválida para tarjeta.',
        created: 'Tarjeta creada correctamente.',
        updated: 'Tarjeta actualizada correctamente.',
    },
    ca: {
        invalidBody: 'Dades invàlides.',
        forbidden: 'No tens accés a aquesta targeta.',
        notFound: 'Targeta no trobada.',
        invalidAccount: 'Compte invàlid per a targeta.',
        created: 'Targeta creada correctament.',
        updated: 'Targeta actualitzada correctament.',
    },
    en: {
        invalidBody: 'Invalid data.',
        forbidden: 'You do not have access to this card.',
        notFound: 'Card not found.',
        invalidAccount: 'Invalid account for card.',
        created: 'Card created successfully.',
        updated: 'Card updated successfully.',
    },
};
const t = (locale, key) => (0, i18n_1.t)(messages, locale, key);
exports.t = t;
//# sourceMappingURL=credit-cards.messages.js.map