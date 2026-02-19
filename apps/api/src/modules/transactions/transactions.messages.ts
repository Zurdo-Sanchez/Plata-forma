import { resolveLocale, type SupportedLocale, t as translate } from '../../i18n';

const messages: Record<SupportedLocale, Record<string, string>> = {
  es: {
    invalidBody: 'Datos inválidos.',
    forbidden: 'No tienes acceso a esta transacción.',
    notFound: 'Transacción no encontrada.',
    unbalanced: 'La suma de las líneas debe ser 0.',
    invalidReference: 'Cuenta o categoría inválida.',
    created: 'Transacción creada correctamente.',
    updated: 'Transacción actualizada correctamente.',
    deleted: 'Transacción eliminada correctamente.',
  },
  ca: {
    invalidBody: 'Dades invàlides.',
    forbidden: 'No tens accés a aquesta transacció.',
    notFound: 'Transacció no trobada.',
    unbalanced: 'La suma de les línies ha de ser 0.',
    invalidReference: 'Compte o categoria invàlida.',
    created: 'Transacció creada correctament.',
    updated: 'Transacció actualitzada correctament.',
    deleted: 'Transacció eliminada correctament.',
  },
  en: {
    invalidBody: 'Invalid data.',
    forbidden: 'You do not have access to this transaction.',
    notFound: 'Transaction not found.',
    unbalanced: 'The sum of the lines must be 0.',
    invalidReference: 'Invalid account or category.',
    created: 'Transaction created successfully.',
    updated: 'Transaction updated successfully.',
    deleted: 'Transaction deleted successfully.',
  },
};

export { resolveLocale };

export const t = (locale: SupportedLocale, key: keyof typeof messages.es) => translate(messages, locale, key);
