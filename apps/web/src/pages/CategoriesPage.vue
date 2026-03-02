<template>
  <q-page class="app-page">
    <section class="page-card">
      <header class="page-header">
        <div>
          <div class="page-kicker">{{ $t('categories.kicker') }}</div>
          <h1>{{ $t('categories.title') }}</h1>
          <p>{{ $t('categories.subtitle') }}</p>
        </div>
      </header>

      <div v-if="!householdsStore.currentId" class="page-empty">
        {{ $t('categories.selectHousehold') }}
      </div>

      <div v-else class="page-grid">
        <div class="page-panel">
          <div class="panel-title">{{ $t('categories.listTitle') }}</div>
          <div v-if="items.length" class="panel-list-header">
            <div class="panel-item-title">{{ $t('categories.name') }}</div>
          </div>
          <div v-if="!items.length" class="panel-empty">{{ $t('categories.empty') }}</div>
          <div v-else class="panel-list">
            <div v-for="category in items" :key="category.id" class="panel-item category-item">
              <div v-if="editingId === category.id" class="panel-edit">
                <label class="panel-label" :for="`category-name-${category.id}`">{{ $t('categories.name') }}</label>
                <input :id="`category-name-${category.id}`" v-model="editName" class="panel-input" type="text" />

                <div class="panel-actions">
                  <button class="panel-action" type="button" @click="saveEdit">
                    {{ $t('categories.save') }}
                  </button>
                  <button class="panel-action" type="button" @click="cancelEdit">
                    {{ $t('categories.cancel') }}
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="panel-item-title">{{ category.name }}</div>
              </div>
              <div class="panel-item-meta category-balances">
                <div>{{ $t('categories.monthTotal') }}: {{ formatCurrency(resolveMonthly(category.id)) }}</div>
                <div>{{ $t('categories.yearTotal') }}: {{ formatCurrency(resolveYearly(category.id)) }}</div>
              </div>
              <div class="panel-actions" v-if="editingId !== category.id">
                <button class="panel-action" type="button" @click="startEdit(category)">
                  {{ $t('categories.edit') }}
                </button>
                <button class="panel-action" type="button" @click="archiveCategory(category.id)">
                  {{ $t('categories.archive') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="page-panel">
          <div class="panel-title">{{ $t('categories.createTitle') }}</div>
          <form class="panel-form" @submit.prevent="onCreate">
            <label class="panel-label" for="category-name">{{ $t('categories.name') }}</label>
            <input id="category-name" v-model="name" class="panel-input" type="text" />

            <button class="panel-button" type="submit" :disabled="isSaving">
              {{ $t('categories.createAction') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { Notify } from 'quasar';
import { t } from '../i18n';
import { apiRequest } from '../composables/apiClient';
import { useHouseholdsStore } from '../stores/households';
import pinia from '../stores/pinia';

const $t = t;
const householdsStore = useHouseholdsStore(pinia);
const items = ref([]);
const name = ref('');
const isSaving = ref(false);
const editingId = ref('');
const editName = ref('');
const balances = ref({ monthly: {}, yearly: {}, month: '' });

const loadCategories = async () => {
  if (!householdsStore.currentId) return;
  try {
    const data = await apiRequest(`/households/${householdsStore.currentId}/categories`, { method: 'GET' });
    items.value = Array.isArray(data) ? data : [];
    await loadBalances();
  } catch {
    items.value = [];
  }
};

const loadBalances = async () => {
  if (!householdsStore.currentId) return;
  const monthKey = new Date().toISOString().slice(0, 7);
  try {
    const data = await apiRequest(
      `/households/${householdsStore.currentId}/categories/balances?month=${encodeURIComponent(monthKey)}`,
      { method: 'GET' }
    );
    balances.value = {
      month: data?.month || monthKey,
      monthly: data?.monthly || {},
      yearly: data?.yearly || {}
    };
  } catch {
    balances.value = { month: monthKey, monthly: {}, yearly: {} };
  }
};

const resolveCurrency = () => householdsStore.currentHousehold?.currency || 'EUR';

const formatCurrency = (amountValue) => {
  const currency = resolveCurrency();
  let amount = BigInt(0);
  try {
    amount = BigInt(String(amountValue ?? 0));
  } catch {
    amount = BigInt(0);
  }
  const isNegative = amount < BigInt(0);
  const absolute = isNegative ? -amount : amount;
  const valueNumber = Number(absolute);
  if (Number.isFinite(valueNumber) && valueNumber <= Number.MAX_SAFE_INTEGER) {
    const normalized = valueNumber / 100;
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(isNegative ? -normalized : normalized);
    } catch {
      return `${isNegative ? '-' : ''}${normalized.toFixed(2)} ${currency}`;
    }
  }
  const whole = absolute / BigInt(100);
  const fraction = (absolute % BigInt(100)).toString().padStart(2, '0');
  return `${isNegative ? '-' : ''}${whole.toString()}.${fraction} ${currency}`;
};

const resolveMonthly = (categoryId) => balances.value.monthly?.[categoryId] ?? 0;
const resolveYearly = (categoryId) => balances.value.yearly?.[categoryId] ?? 0;
const startEdit = (category) => {
  editingId.value = category.id;
  editName.value = category.name || '';
};

const cancelEdit = () => {
  editingId.value = '';
  editName.value = '';
};

const saveEdit = async () => {
  if (!editingId.value || !householdsStore.currentId) return;
  if (!editName.value.trim()) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  try {
    const response = await apiRequest(`/categories/${editingId.value}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: editName.value.trim()
      })
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    cancelEdit();
    await loadCategories();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  }
};

const onCreate = async () => {
  if (isSaving.value || !householdsStore.currentId) return;
  if (!name.value.trim()) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  isSaving.value = true;
  try {
    const response = await apiRequest(`/households/${householdsStore.currentId}/categories`, {
      method: 'POST',
      body: JSON.stringify({
        name: name.value.trim()
      })
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    name.value = '';
    await loadCategories();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  } finally {
    isSaving.value = false;
  }
};

const archiveCategory = async (id) => {
  if (!householdsStore.currentId) return;
  try {
    const response = await apiRequest(`/categories/${id}`, { method: 'DELETE' });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    await loadCategories();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  }
};

watch(
  () => householdsStore.currentId,
  () => {
    loadCategories();
  }
);

onMounted(() => {
  householdsStore.load();
  loadCategories();
});
</script>

<style scoped>
.category-balances {
  margin-left: auto;
  text-align: right;
  display: grid;
  gap: 4px;
}
.panel-list-header {
  padding: 8px 0 12px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.category-item .panel-actions {
  justify-content: flex-end;
}
</style>
