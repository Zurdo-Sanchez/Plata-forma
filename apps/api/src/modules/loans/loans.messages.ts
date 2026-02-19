import { resolveLocale, type SupportedLocale, t as translate } from '../../i18n';

const messages: Record<SupportedLocale, Record<string, string>> = {
  es: {
    invalidBody: 'Datos inválidos.',
    forbidden: 'No tienes acceso a este préstamo.',
    notFound: 'Préstamo no encontrado.',
    invalidAccount: 'Cuenta inválida para préstamo.',
    created: 'Préstamo creado correctamente.',
    updated: 'Préstamo actualizado correctamente.',
  },
  ca: {
    invalidBody: 'Dades invàlides.',
    forbidden: 'No tens accés a aquest préstec.',
    notFound: 'Préstec no trobat.',
    invalidAccount: 'Compte invàlid per al préstec.',
    created: 'Préstec creat correctament.',
    updated: 'Préstec actualitzat correctament.',
  },
  en: {
    invalidBody: 'Invalid data.',
    forbidden: 'You do not have access to this loan.',
    notFound: 'Loan not found.',
    invalidAccount: 'Invalid account for loan.',
    created: 'Loan created successfully.',
    updated: 'Loan updated successfully.',
  },
};

export { resolveLocale };

export const t = (locale: SupportedLocale, key: keyof typeof messages.es) => translate(messages, locale, key);
