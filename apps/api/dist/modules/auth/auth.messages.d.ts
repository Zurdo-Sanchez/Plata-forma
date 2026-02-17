export type SupportedLocale = 'es' | 'ca' | 'en';
export declare const DEFAULT_LOCALE: SupportedLocale;
declare const messages: Record<SupportedLocale, Record<string, string>>;
export declare function resolveLocale(acceptLanguage?: string): SupportedLocale;
export declare function t(locale: SupportedLocale, key: keyof typeof messages.es): string;
export {};
