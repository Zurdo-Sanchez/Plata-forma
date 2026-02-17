"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LOCALE = void 0;
exports.resolveLocale = resolveLocale;
exports.t = t;
exports.DEFAULT_LOCALE = 'es';
const messages = {
    es: {
        invalidBody: 'Datos inválidos.',
        userExists: 'El usuario ya existe.',
        invalidCredentials: 'Credenciales inválidas.',
        locked: 'Cuenta bloqueada por intentos fallidos. Intenta más tarde.',
        registered: 'Registro exitoso.',
        loggedIn: 'Login exitoso.',
    },
    ca: {
        invalidBody: 'Dades invàlides.',
        userExists: 'L\'usuari ja existeix.',
        invalidCredentials: 'Credencials invàlides.',
        locked: 'Compte bloquejat per intents fallits. Torna-ho a provar més tard.',
        registered: 'Registre exitós.',
        loggedIn: 'Inici de sessió exitós.',
    },
    en: {
        invalidBody: 'Invalid data.',
        userExists: 'User already exists.',
        invalidCredentials: 'Invalid credentials.',
        locked: 'Account locked due to failed attempts. Try again later.',
        registered: 'Registration successful.',
        loggedIn: 'Login successful.',
    },
};
function resolveLocale(acceptLanguage) {
    if (!acceptLanguage) {
        return exports.DEFAULT_LOCALE;
    }
    const language = acceptLanguage.split(',')[0]?.trim().toLowerCase();
    if (!language) {
        return exports.DEFAULT_LOCALE;
    }
    if (language.startsWith('ca')) {
        return 'ca';
    }
    if (language.startsWith('en')) {
        return 'en';
    }
    return 'es';
}
function t(locale, key) {
    return messages[locale][key] ?? messages[exports.DEFAULT_LOCALE][key];
}
//# sourceMappingURL=auth.messages.js.map