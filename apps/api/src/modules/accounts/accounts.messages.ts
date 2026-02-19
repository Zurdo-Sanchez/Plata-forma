import { resolveLocale, type SupportedLocale, t as translate } from '../../i18n';

const messages: Record<SupportedLocale, Record<string, string>> = {
  es: {
    invalidBody: 'Datos inválidos.',
    forbidden: 'No tienes acceso a esta cuenta.',
    notFound: 'Cuenta no encontrada.',
    created: 'Cuenta creada correctamente.',
    updated: 'Cuenta actualizada correctamente.',
    archived: 'Cuenta archivada correctamente.',
  },
  ca: {
    invalidBody: 'Dades invàlides.',
    forbidden: 'No tens accés a aquest compte.',
    notFound: 'Compte no trobat.',
    created: 'Compte creat correctament.',
    updated: 'Compte actualitzat correctament.',
    archived: 'Compte arxivat correctament.',
  },
  en: {
    invalidBody: 'Invalid data.',
    forbidden: 'You do not have access to this account.',
    notFound: 'Account not found.',
    created: 'Account created successfully.',
    updated: 'Account updated successfully.',
    archived: 'Account archived successfully.',
  },
};

export { resolveLocale };

export const t = (locale: SupportedLocale, key: keyof typeof messages.es) => translate(messages, locale, key);
