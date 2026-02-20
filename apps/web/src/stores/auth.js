import { defineStore } from 'pinia';
import { apiRequest } from '../composables/apiClient';
import { safeStorage } from '../utils/storage';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: safeStorage.get('auth_token') || '',
    user: null,
    ready: false
  }),
  actions: {
    setToken(token) {
      this.token = token;
      safeStorage.set('auth_token', token);
    },
    clear() {
      this.token = '';
      this.user = null;
      safeStorage.remove('auth_token');
    },
    async fetchMe() {
      if (!this.token) {
        this.ready = true;
        return;
      }
      try {
        const response = await apiRequest('/auth/me', { method: 'GET' });
        this.user = response?.user || null;
      } catch {
        this.clear();
      } finally {
        this.ready = true;
      }
    }
  }
});
