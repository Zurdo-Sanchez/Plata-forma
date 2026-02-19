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
              <button class="panel-action" type="button" @click="removeTransaction(tx.id)">
                {{ $t('transactions.delete') }}
              </button>
            </div>
          </div>
        </div>

        <div class="page-panel">
          <div class="panel-title">{{ $t('transactions.createTitle') }}</div>
          <form class="panel-form" @submit.prevent="onCreate">
            <label class="panel-label" for="tx-date">{{ $t('transactions.date') }}</label>
            <input id="tx-date" v-model="date" class="panel-input" type="date" />

            <label class="panel-label" for="tx-desc">{{ $t('transactions.description') }}</label>
            <input id="tx-desc" v-model="description" class="panel-input" type="text" />

            <div class="panel-divider">{{ $t('transactions.linesTitle') }}</div>
            <div class="panel-lines">
              <div v-for="(line, idx) in lines" :key="idx" class="panel-line">
                <select v-model="line.accountId" class="panel-input">
                  <option disabled value="">{{ $t('transactions.account') }}</option>
                  <option v-for="account in accounts" :key="account.id" :value="account.id">
                    {{ account.name }}
                  </option>
                </select>

                <select v-model="line.categoryId" class="panel-input">
                  <option value="">{{ $t('transactions.categoryOptional') }}</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>

                <input
                  v-model="line.amount"
                  class="panel-input"
                  type="number"
                  step="1"
                  :placeholder="$t('transactions.amount')"
                />
                <input v-model="line.memo" class="panel-input" type="text" :placeholder="$t('transactions.memo')" />

                <button class="panel-action" type="button" @click="removeLine(idx)">
                  {{ $t('transactions.removeLine') }}
                </button>
              </div>
            </div>

            <div class="panel-row">
              <button class="panel-action" type="button" @click="addLine">
                {{ $t('transactions.addLine') }}
              </button>
              <span class="panel-meta">
                {{ $t('transactions.balanceLabel') }} {{ lineBalance }}
              </span>
            </div>

            <button class="panel-button" type="submit" :disabled="isSaving">
              {{ $t('transactions.createAction') }}
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

const $t = t;
const householdsStore = useHouseholdsStore();
const items = ref([]);
const accounts = ref([]);
const categories = ref([]);
const date = ref('');
const description = ref('');
const lines = ref([
  { accountId: '', categoryId: '', amount: '0', memo: '' },
  { accountId: '', categoryId: '', amount: '0', memo: '' }
]);
const isSaving = ref(false);

const normalizeAmount = (value) => {
  const str = String(value ?? '').trim();
  if (!str) return null;
  if (!/^-?\d+$/.test(str)) return null;
  return str;
};

const parseAmount = (value) => {
  const normalized = normalizeAmount(value);
  if (!normalized) return BigInt(0);
  return BigInt(normalized);
};

const lineBalance = computed(() =>
  lines.value.reduce((sum, line) => sum + parseAmount(line.amount), BigInt(0)).toString()
);

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

const addLine = () => {
  lines.value.push({ accountId: '', categoryId: '', amount: '0', memo: '' });
};

const removeLine = (index) => {
  if (lines.value.length <= 2) return;
  lines.value.splice(index, 1);
};

const onCreate = async () => {
  if (isSaving.value || !householdsStore.currentId) return;
  const normalizedLines = lines.value.map((line) => ({
    accountId: line.accountId,
    categoryId: line.categoryId || undefined,
    amount: normalizeAmount(line.amount),
    memo: line.memo || undefined
  }));

  if (
    !date.value ||
    normalizedLines.some((line) => !line.accountId) ||
    normalizedLines.some((line) => line.amount === null)
  ) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  isSaving.value = true;
  try {
    const payload = {
      date: date.value,
      description: description.value.trim() || undefined,
      lines: normalizedLines.map((line) => ({
        accountId: line.accountId,
        categoryId: line.categoryId,
        amount: line.amount,
        memo: line.memo
      }))
    };
    const response = await apiRequest(`/households/${householdsStore.currentId}/transactions`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    date.value = '';
    description.value = '';
    lines.value = [
      { accountId: '', categoryId: '', amount: '0', memo: '' },
      { accountId: '', categoryId: '', amount: '0', memo: '' }
    ];
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
