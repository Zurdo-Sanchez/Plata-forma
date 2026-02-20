import { defineStore } from 'pinia';
import { apiRequest } from '../composables/apiClient';
import { safeStorage } from '../utils/storage';

const STORAGE_KEY = 'current_household_id';

export const useHouseholdsStore = defineStore('households', {
  state: () => ({
    items: [],
    loading: false,
    currentId: safeStorage.get(STORAGE_KEY) || ''
  }),
  getters: {
    currentHousehold(state) {
      return state.items.find((item) => item.id === state.currentId) || null;
    }
  },
  actions: {
    async load() {
      if (this.loading) return;
      this.loading = true;
      try {
        const data = await apiRequest('/households', { method: 'GET' });
        this.items = Array.isArray(data) ? data : [];
        if (!this.currentId && this.items.length) {
          this.select(this.items[0].id);
        }
      } catch {
        this.items = [];
      } finally {
        this.loading = false;
      }
    },
    select(id) {
      this.currentId = id;
      safeStorage.set(STORAGE_KEY, id);
    },
    async create(payload) {
      const response = await apiRequest('/households', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      if (response?.household) {
        this.items.push(response.household);
        this.select(response.household.id);
      }
      return response;
    },
    async addMember(householdId, payload) {
      return apiRequest(`/households/${householdId}/members`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    },
    async update(householdId, payload) {
      const response = await apiRequest(`/households/${householdId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload)
      });
      if (response?.household) {
        this.items = this.items.map((item) => (item.id === householdId ? { ...item, ...response.household } : item));
      }
      return response;
    },
    async remove(householdId) {
      const response = await apiRequest(`/households/${householdId}`, { method: 'DELETE' });
      this.items = this.items.filter((item) => item.id !== householdId);
      if (this.currentId === householdId) {
        const next = this.items[0]?.id || '';
        this.select(next);
      }
      return response;
    }
  }
});
