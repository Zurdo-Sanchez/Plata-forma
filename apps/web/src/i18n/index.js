import { ref } from 'vue';
import es from './es';
import en from './en';
import ca from './ca';

const messages = { es, en, ca };
const supportedLocales = Object.keys(messages);
const fallbackLocale = 'es';

const normalizeLocale = (value) => (value || '').toLowerCase().split('-')[0];

const resolveMessage = (source, key) =>
  key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), source);

const formatMessage = (value, params) => {
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (match, key) => (params[key] !== undefined ? params[key] : match));
};

const getInitialLocale = () => {
  const candidates = [];

  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('locale');
    if (stored) candidates.push(stored);
  }

  if (typeof navigator !== 'undefined') {
    if (Array.isArray(navigator.languages)) candidates.push(...navigator.languages);
    if (navigator.language) candidates.push(navigator.language);
  }

  for (const candidate of candidates) {
    const normalized = normalizeLocale(candidate);
    if (supportedLocales.includes(normalized)) return normalized;
  }

  return fallbackLocale;
};

export const locale = ref(getInitialLocale());

export const setLocale = (value) => {
  const normalized = normalizeLocale(value);
  const next = supportedLocales.includes(normalized) ? normalized : fallbackLocale;
  locale.value = next;

  if (typeof document !== 'undefined') {
    document.documentElement.lang = next;
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('locale', next);
  }
};

setLocale(locale.value);

export const t = (key, params) => {
  const current = resolveMessage(messages[locale.value], key);
  const fallback = resolveMessage(messages[fallbackLocale], key);
  const message = current !== undefined ? current : fallback !== undefined ? fallback : key;
  return typeof message === 'string' ? formatMessage(message, params) : message;
};

export const installI18n = (app) => {
  app.config.globalProperties.$t = t;
  app.config.globalProperties.$locale = locale;
  app.provide('i18n', { t, locale, setLocale, supportedLocales });
};
