"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.resolveLocale = void 0;
const i18n_1 = require("../../i18n");
Object.defineProperty(exports, "resolveLocale", { enumerable: true, get: function () { return i18n_1.resolveLocale; } });
const messages = {
    es: {
        invalidBody: 'Datos inválidos.',
        forbidden: 'No tienes acceso a este reporte.',
        uncategorized: 'Sin categoría',
    },
    ca: {
        invalidBody: 'Dades invàlides.',
        forbidden: 'No tens accés a aquest informe.',
        uncategorized: 'Sense categoria',
    },
    en: {
        invalidBody: 'Invalid data.',
        forbidden: 'You do not have access to this report.',
        uncategorized: 'Uncategorized',
    },
};
const t = (locale, key) => (0, i18n_1.t)(messages, locale, key);
exports.t = t;
//# sourceMappingURL=reports.messages.js.map