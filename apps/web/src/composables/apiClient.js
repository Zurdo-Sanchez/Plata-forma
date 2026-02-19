import { locale, t } from '../i18n';

const resolveApiBase = () => {
  const envUrl =
    (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.API_URL || import.meta.env.VITE_API_URL)) ||
    null;
  const fallbackHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const fallbackProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:';

  if (envUrl) {
    try {
      const url = new URL(envUrl);
      if (typeof window !== 'undefined' && url.hostname === 'api') {
        url.hostname = fallbackHost;
      }
      return url.toString().replace(/\/$/, '');
    } catch {
      return envUrl.replace(/\/$/, '');
    }
  }

  return `${fallbackProtocol}//${fallbackHost}:3333`;
};

const apiBase = resolveApiBase();

const parseJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const apiRequest = async (path, options = {}, { withAuth = true } = {}) => {
  let response;
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': locale.value,
    ...(options.headers || {})
  };

  if (withAuth && typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  try {
    response = await fetch(`${apiBase}${path}`, {
      ...options,
      headers
    });
  } catch {
    const error = new Error(t('app.errors.network'));
    error.status = 0;
    throw error;
  }

  const data = await parseJson(response);

  if (!response.ok) {
    const message = data?.message || t('app.errors.generic');
    const error = new Error(message);
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
};
