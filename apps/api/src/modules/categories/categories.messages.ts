import { resolveLocale, type SupportedLocale, t as translate } from '../../i18n';

const messages: Record<SupportedLocale, Record<string, string>> = {
  es: {
    invalidBody: 'Datos inválidos.',
    forbidden: 'No tienes acceso a esta categoría.',
    notFound: 'Categoría no encontrada.',
    created: 'Categoría creada correctamente.',
    updated: 'Categoría actualizada correctamente.',
    archived: 'Categoría archivada correctamente.',
  },
  ca: {
    invalidBody: 'Dades invàlides.',
    forbidden: 'No tens accés a aquesta categoria.',
    notFound: 'Categoria no trobada.',
    created: 'Categoria creada correctament.',
    updated: 'Categoria actualitzada correctament.',
    archived: 'Categoria arxivada correctament.',
  },
  en: {
    invalidBody: 'Invalid data.',
    forbidden: 'You do not have access to this category.',
    notFound: 'Category not found.',
    created: 'Category created successfully.',
    updated: 'Category updated successfully.',
    archived: 'Category archived successfully.',
  },
};

export { resolveLocale };

export const t = (locale: SupportedLocale, key: keyof typeof messages.es) => translate(messages, locale, key);
