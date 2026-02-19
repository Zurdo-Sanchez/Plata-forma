import { type SupportedLocale } from '../../i18n';
declare const messages: Record<SupportedLocale, Record<string, string>>;
export declare function t(locale: SupportedLocale, key: keyof typeof messages.es): string;
export {};
