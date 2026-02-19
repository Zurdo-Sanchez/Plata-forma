import { apiRequest } from './apiClient';

export const useAuth = () => {
  const login = (payload) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) }, { withAuth: false });

  const register = (payload) =>
    apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) }, { withAuth: false });

  const requestRecovery = async () => ({ ok: true });

  const resetPassword = async () => ({ ok: true });

  const me = () => apiRequest('/auth/me', { method: 'GET' });

  return {
    login,
    register,
    requestRecovery,
    resetPassword,
    me
  };
};
