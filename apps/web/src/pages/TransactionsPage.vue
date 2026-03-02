<template>
  <q-page class="app-page">
    <section class="page-card">
      <header class="page-header">
        <div>
          <div class="page-kicker">{{ $t('transactions.kicker') }}</div>
          <h1>{{ $t('transactions.title') }}</h1>
          <p>{{ $t('transactions.subtitle') }}</p>
        </div>
      </header>

      <div v-if="!householdsStore.currentId" class="page-empty">
        {{ $t('transactions.selectHousehold') }}
      </div>

      <div v-else class="page-grid">
        <div class="page-panel">
          <div class="panel-title">{{ $t('transactions.listTitle') }}</div>
          <div v-if="!items.length" class="panel-empty">{{ $t('transactions.empty') }}</div>
          <div v-else class="panel-list">
            <div v-for="tx in items" :key="tx.id" class="panel-item">
              <div>
                <div class="panel-item-title">{{ tx.description || $t('transactions.noDescription') }}</div>
                <div class="panel-item-meta">
                  {{ formatDate(tx.date) }} · {{ tx.lines?.length || 0 }} {{ $t('transactions.lines') }}
                </div>
              </div>
              <div class="panel-actions">
                <button v-if="canEdit(tx)" class="panel-action" type="button" @click="startEdit(tx)">
                  {{ $t('transactions.edit') }}
                </button>
                <button class="panel-action" type="button" @click="removeTransaction(tx.id)">
                  {{ $t('transactions.delete') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="page-panel">
          <div class="panel-title">{{ isEditing ? $t('transactions.edit') : $t('transactions.createTitle') }}</div>
          <form class="panel-form" @submit.prevent="onSubmit">
            <label class="panel-label" for="tx-date">{{ $t('transactions.date') }}</label>
            <input id="tx-date" v-model="date" class="panel-input" type="date" />

            <label class="panel-label" for="tx-desc">{{ $t('transactions.description') }}</label>
            <input id="tx-desc" v-model="description" class="panel-input" type="text" />

            <label class="panel-label" for="tx-account">{{ $t('transactions.account') }}</label>
            <select id="tx-account" v-model="accountId" class="panel-input">
              <option disabled value="">{{ $t('transactions.account') }}</option>
              <option v-for="account in accounts" :key="account.id" :value="account.id">
                {{ account.name }}
              </option>
            </select>

            <label class="panel-label" for="tx-type">{{ $t('transactions.type') }}</label>
            <select id="tx-type" v-model="entryType" class="panel-input">
              <option value="EXPENSE">{{ $t('transactions.typeExpense') }}</option>
              <option value="INCOME">{{ $t('transactions.typeIncome') }}</option>
            </select>

            <label class="panel-label" for="tx-category">{{ $t('transactions.category') }}</label>
            <select id="tx-category" v-model="categoryId" class="panel-input">
              <option disabled value="">{{ $t('transactions.category') }}</option>
              <option v-for="category in filteredCategories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>

            <label class="panel-label" for="tx-amount">{{ $t('transactions.amount') }}</label>
            <input id="tx-amount" v-model="amount" class="panel-input" type="number" step="1" />

            <label class="panel-label" for="tx-memo">{{ $t('transactions.memo') }}</label>
            <input id="tx-memo" v-model="memo" class="panel-input" type="text" />

            <button class="panel-button" type="submit" :disabled="isSaving">
              {{ isEditing ? $t('transactions.updateAction') : $t('transactions.createAction') }}
            </button>
            <button v-if="isEditing" class="panel-button" type="button" @click="cancelEdit">
              {{ $t('transactions.cancelAction') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { Notify } from 'quasar';
import { t } from '../i18n';
import { apiRequest } from '../composables/apiClient';
import { useHouseholdsStore } from '../stores/households';
import pinia from '../stores/pinia';

const $t = t;
const householdsStore = useHouseholdsStore(pinia);
const items = ref([]);
const accounts = ref([]);
const categories = ref([]);
const date = ref('');
const description = ref('');
const accountId = ref('');
const categoryId = ref('');
const entryType = ref('EXPENSE');
const amount = ref('');
const memo = ref('');
const isSaving = ref(false);
const editingId = ref('');
const isEditing = computed(() => Boolean(editingId.value));
const filteredCategories = computed(() => categories.value);

const formatDate = (value) => {
  try {
    const dateValue = new Date(value);
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(dateValue);
  } catch {
    return value;
  }
};

const loadTransactions = async () => {
  if (!householdsStore.currentId) return;
  try {
    const data = await apiRequest(`/households/${householdsStore.currentId}/transactions`, { method: 'GET' });
    items.value = Array.isArray(data) ? data : [];
  } catch {
    items.value = [];
  }
};

const loadDependencies = async () => {
  if (!householdsStore.currentId) return;
  try {
    const [accountsData, categoriesData] = await Promise.all([
      apiRequest(`/households/${householdsStore.currentId}/accounts`, { method: 'GET' }),
      apiRequest(`/households/${householdsStore.currentId}/categories`, { method: 'GET' })
    ]);
    accounts.value = Array.isArray(accountsData) ? accountsData : [];
    categories.value = Array.isArray(categoriesData) ? categoriesData : [];
  } catch {
    accounts.value = [];
    categories.value = [];
  }
};
const normalizeAmount = (value) => {
  const str = String(value ?? '').trim();
  if (!str) return null;
  if (!/^\d+$/.test(str)) return null;
  return str;
};

const resetForm = () => {
  date.value = '';
  description.value = '';
  accountId.value = '';
  categoryId.value = '';
  entryType.value = 'EXPENSE';
  amount.value = '';
  memo.value = '';
};

const canEdit = (tx) => {
  const lines = Array.isArray(tx?.lines) ? tx.lines : [];
  const categoryLines = lines.filter((line) => line.categoryId);
  if (categoryLines.length !== 1) return false;
  if (lines.length !== 2) return false;
  return true;
};

const startEdit = (tx) => {
  if (!canEdit(tx)) return;
  const line = tx.lines.find((item) => item.categoryId);
  if (!line) return;
  editingId.value = tx.id;
  date.value = String(tx.date).slice(0, 10);
  description.value = tx.description || '';
  accountId.value = line.accountId;
  categoryId.value = line.categoryId;
  const amountStr = String(line.amount);
  entryType.value = amountStr.startsWith('-') ? 'EXPENSE' : 'INCOME';
  amount.value = amountStr.replace('-', '');
  memo.value = line.memo || '';
};

const cancelEdit = () => {
  editingId.value = '';
  resetForm();
};

const onSubmit = async () => {
  if (isSaving.value || !householdsStore.currentId) return;
  const normalizedAmount = normalizeAmount(amount.value);
  if (!date.value || !accountId.value || !categoryId.value || !normalizedAmount) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  isSaving.value = true;
  try {
    const payload = {
      date: date.value,
      description: description.value.trim() || undefined,
      entry: {
        accountId: accountId.value,
        categoryId: categoryId.value,
        amount: normalizedAmount,
        type: entryType.value,
        memo: memo.value.trim() || undefined
      }
    };
    const response = isEditing.value
      ? await apiRequest(`/transactions/${editingId.value}`, { method: 'PATCH', body: JSON.stringify(payload) })
      : await apiRequest(`/households/${householdsStore.currentId}/transactions`, {
          method: 'POST',
          body: JSON.stringify(payload)
        });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    cancelEdit();
    await loadTransactions();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  } finally {
    isSaving.value = false;
  }
};

const removeTransaction = async (id) => {
  if (!householdsStore.currentId) return;
  try {
    const response = await apiRequest(`/transactions/${id}`, { method: 'DELETE' });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    await loadTransactions();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  }
};

watch(entryType, () => {
  if (!isEditing.value) {
    categoryId.value = '';
  }
});

watch(
  () => householdsStore.currentId,
  () => {
    loadDependencies();
    loadTransactions();
  }
);

onMounted(() => {
  householdsStore.load();
  loadDependencies();
  loadTransactions();
});
</script>
