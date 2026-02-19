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

const request = async (path, options = {}) => {
  let response;
  try {
    response = await fetch(`${apiBase}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': locale.value,
        ...(options.headers || {})
      }
    });
  } catch {
    throw new Error(t('auth.errors.network'));
  }

  const data = await parseJson(response);

  if (!response.ok) {
    const message = data?.message || t('auth.errors.generic');
    const error = new Error(message);
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
};

export const useAuth = () => {
  const login = (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });

  const register = (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });

  const requestRecovery = async () => ({ ok: true });

  const resetPassword = async () => ({ ok: true });

  return {
    login,
    register,
    requestRecovery,
    resetPassword
  };
};
