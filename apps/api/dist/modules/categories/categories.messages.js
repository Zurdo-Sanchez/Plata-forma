"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.resolveLocale = void 0;
const i18n_1 = require("../../i18n");
Object.defineProperty(exports, "resolveLocale", { enumerable: true, get: function () { return i18n_1.resolveLocale; } });
const messages = {
    es: {
        invalidBody: 'Datos inválidos.',
        forbidden: 'No tienes acceso a esta categoría.',
        notFound: 'Categoría no encontrada.',
        created: 'Categoría creada correctamente.',
        updated: 'Categoría actualizada correctamente.',
        archived: 'Categoría archivada correctamente.',
    },
    ca: {
        invalidBody: 'Dades invàlides.',
        forbidden: 'No tens accés a aquesta categoria.',
        notFound: 'Categoria no trobada.',
        created: 'Categoria creada correctament.',
        updated: 'Categoria actualitzada correctament.',
        archived: 'Categoria arxivada correctament.',
    },
    en: {
        invalidBody: 'Invalid data.',
        forbidden: 'You do not have access to this category.',
        notFound: 'Category not found.',
        created: 'Category created successfully.',
        updated: 'Category updated successfully.',
        archived: 'Category archived successfully.',
    },
};
const t = (locale, key) => (0, i18n_1.t)(messages, locale, key);
exports.t = t;
//# sourceMappingURL=categories.messages.js.map