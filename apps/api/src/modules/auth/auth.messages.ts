import { resolveLocale, type SupportedLocale, t as translate } from '../../i18n';

const messages: Record<SupportedLocale, Record<string, string>> = {
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

export function t(locale: SupportedLocale, key: keyof typeof messages.es) {
  return translate(messages, locale, key);
}
