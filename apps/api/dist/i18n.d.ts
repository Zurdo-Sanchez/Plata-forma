export type SupportedLocale = 'es' | 'ca' | 'en';
export declare const resolveLocale: (acceptLanguage?: string) => SupportedLocale;
export declare const t: <K extends string>(messages: Record<SupportedLocale, Record<K, string>>, locale: SupportedLocale, key: K) => Record<K, string>[K];
