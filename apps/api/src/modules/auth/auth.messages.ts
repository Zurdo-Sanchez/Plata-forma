export type SupportedLocale = 'es' | 'ca' | 'en';

export const DEFAULT_LOCALE: SupportedLocale = 'es';

const messages: Record<SupportedLocale, Record<string, string>> = {
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

export function resolveLocale(acceptLanguage?: string): SupportedLocale {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  const language = acceptLanguage.split(',')[0]?.trim().toLowerCase();
  if (!language) {
    return DEFAULT_LOCALE;
  }

  if (language.startsWith('ca')) {
    return 'ca';
  }
  if (language.startsWith('en')) {
    return 'en';
  }

  return 'es';
}

export function t(locale: SupportedLocale, key: keyof typeof messages.es) {
  return messages[locale][key] ?? messages[DEFAULT_LOCALE][key];
}
