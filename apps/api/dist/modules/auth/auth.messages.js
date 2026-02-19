"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = t;
const i18n_1 = require("../../i18n");
const messages = {
    es: {
        invalidBody: 'Datos inválidos.',
        userExists: 'El usuario ya existe.',
        invalidCredentials: 'Credenciales inválidas.',
        locked: 'Cuenta bloqueada por intentos fallidos. Intenta más tarde.',
        registered: 'Registro exitoso.',
        loggedIn: 'Login exitoso.',
        unauthorized: 'No autorizado.',
    },
    ca: {
        invalidBody: 'Dades invàlides.',
        userExists: 'L\'usuari ja existeix.',
        invalidCredentials: 'Credencials invàlides.',
        locked: 'Compte bloquejat per intents fallits. Torna-ho a provar més tard.',
        registered: 'Registre exitós.',
        loggedIn: 'Inici de sessió exitós.',
        unauthorized: 'No autoritzat.',
    },
    en: {
        invalidBody: 'Invalid data.',
        userExists: 'User already exists.',
        invalidCredentials: 'Invalid credentials.',
        locked: 'Account locked due to failed attempts. Try again later.',
        registered: 'Registration successful.',
        loggedIn: 'Login successful.',
        unauthorized: 'Unauthorized.',
    },
};
function t(locale, key) {
    return (0, i18n_1.t)(messages, locale, key);
}
//# sourceMappingURL=auth.messages.js.map