import { resolveLocale, type SupportedLocale } from '../../i18n';
declare const messages: Record<SupportedLocale, Record<string, string>>;
export { resolveLocale };
export declare const t: (locale: SupportedLocale, key: keyof typeof messages.es) => string;
