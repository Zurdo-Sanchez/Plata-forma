import { defineStore } from 'pinia';
import { apiRequest } from '../composables/apiClient';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : '',
    user: null,
    ready: false
  }),
  actions: {
    setToken(token) {
      this.token = token;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('auth_token', token);
      }
    },
    clear() {
      this.token = '';
      this.user = null;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
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
