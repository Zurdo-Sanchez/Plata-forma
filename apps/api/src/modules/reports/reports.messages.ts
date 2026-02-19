import { resolveLocale, type SupportedLocale, t as translate } from '../../i18n';

const messages: Record<SupportedLocale, Record<string, string>> = {
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

export { resolveLocale };

export const t = (locale: SupportedLocale, key: keyof typeof messages.es) => translate(messages, locale, key);
