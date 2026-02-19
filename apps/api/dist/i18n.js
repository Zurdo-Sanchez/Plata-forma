"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = exports.resolveLocale = void 0;
const normalizeLocale = (value) => (value || '').toLowerCase().split('-')[0];
const resolveDefaultLocale = () => {
    const raw = normalizeLocale(process.env.DEFAULT_LOCALE);
    if (raw === 'ca' || raw === 'en' || raw === 'es') {
        return raw;
    }
    return 'es';
};
const DEFAULT_LOCALE = resolveDefaultLocale();
const resolveLocale = (acceptLanguage) => {
    if (!acceptLanguage)
        return DEFAULT_LOCALE;
    const language = normalizeLocale(acceptLanguage.split(',')[0]);
    if (language === 'ca' || language === 'en' || language === 'es') {
        return language;
    }
    return DEFAULT_LOCALE;
};
exports.resolveLocale = resolveLocale;
const t = (messages, locale, key) => messages[locale]?.[key] ?? messages[DEFAULT_LOCALE]?.[key] ?? key;
exports.t = t;
//# sourceMappingURL=i18n.js.map