"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.resolveLocale = void 0;
const i18n_1 = require("../../i18n");
Object.defineProperty(exports, "resolveLocale", { enumerable: true, get: function () { return i18n_1.resolveLocale; } });
const messages = {
    es: {
        invalidBody: 'Datos inválidos.',
        forbidden: 'No tienes acceso a este hogar.',
        notFound: 'Hogar no encontrado.',
        memberExists: 'El usuario ya es miembro del hogar.',
        userNotFound: 'Usuario no encontrado.',
        created: 'Hogar creado correctamente.',
        updated: 'Hogar actualizado correctamente.',
        memberAdded: 'Miembro agregado correctamente.',
    },
    ca: {
        invalidBody: 'Dades invàlides.',
        forbidden: 'No tens accés a aquesta llar.',
        notFound: 'Llar no trobada.',
        memberExists: 'L\'usuari ja és membre de la llar.',
        userNotFound: 'Usuari no trobat.',
        created: 'Llar creada correctament.',
        updated: 'Llar actualitzada correctament.',
        memberAdded: 'Membre afegit correctament.',
    },
    en: {
        invalidBody: 'Invalid data.',
        forbidden: 'You do not have access to this household.',
        notFound: 'Household not found.',
        memberExists: 'User is already a household member.',
        userNotFound: 'User not found.',
        created: 'Household created successfully.',
        updated: 'Household updated successfully.',
        memberAdded: 'Member added successfully.',
    },
};
const t = (locale, key) => (0, i18n_1.t)(messages, locale, key);
exports.t = t;
//# sourceMappingURL=households.messages.js.map