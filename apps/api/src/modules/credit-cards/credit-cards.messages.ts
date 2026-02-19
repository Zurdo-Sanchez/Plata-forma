import { resolveLocale, type SupportedLocale, t as translate } from '../../i18n';

const messages: Record<SupportedLocale, Record<string, string>> = {
  es: {
    invalidBody: 'Datos inválidos.',
    forbidden: 'No tienes acceso a esta tarjeta.',
    notFound: 'Tarjeta no encontrada.',
    invalidAccount: 'Cuenta inválida para tarjeta.',
    created: 'Tarjeta creada correctamente.',
    updated: 'Tarjeta actualizada correctamente.',
  },
  ca: {
    invalidBody: 'Dades invàlides.',
    forbidden: 'No tens accés a aquesta targeta.',
    notFound: 'Targeta no trobada.',
    invalidAccount: 'Compte invàlid per a targeta.',
    created: 'Targeta creada correctament.',
    updated: 'Targeta actualitzada correctament.',
  },
  en: {
    invalidBody: 'Invalid data.',
    forbidden: 'You do not have access to this card.',
    notFound: 'Card not found.',
    invalidAccount: 'Invalid account for card.',
    created: 'Card created successfully.',
    updated: 'Card updated successfully.',
  },
};

export { resolveLocale };

export const t = (locale: SupportedLocale, key: keyof typeof messages.es) => translate(messages, locale, key);
