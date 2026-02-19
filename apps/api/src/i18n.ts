export type SupportedLocale = 'es' | 'ca' | 'en';

const normalizeLocale = (value?: string) => (value || '').toLowerCase().split('-')[0];

const resolveDefaultLocale = (): SupportedLocale => {
  const raw = normalizeLocale(process.env.DEFAULT_LOCALE);
  if (raw === 'ca' || raw === 'en' || raw === 'es') {
    return raw;
  }
  return 'es';
};

const DEFAULT_LOCALE: SupportedLocale = resolveDefaultLocale();

export const resolveLocale = (acceptLanguage?: string): SupportedLocale => {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const language = normalizeLocale(acceptLanguage.split(',')[0]);
  if (language === 'ca' || language === 'en' || language === 'es') {
    return language;
  }
  return DEFAULT_LOCALE;
};

export const t = <K extends string>(
  messages: Record<SupportedLocale, Record<K, string>>,
  locale: SupportedLocale,
  key: K,
) => messages[locale]?.[key] ?? messages[DEFAULT_LOCALE]?.[key] ?? key;
