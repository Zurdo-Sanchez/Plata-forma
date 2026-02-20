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
    }
  }
});
