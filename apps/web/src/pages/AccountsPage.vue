<template>
  <q-page class="app-page">
    <section class="page-card">
      <header class="page-header">
        <div>
          <div class="page-kicker">{{ $t('accounts.kicker') }}</div>
          <h1>{{ $t('accounts.title') }}</h1>
          <p>{{ $t('accounts.subtitle') }}</p>
        </div>
      </header>

      <div v-if="!householdsStore.currentId" class="page-empty">
        {{ $t('accounts.selectHousehold') }}
      </div>

      <div v-else class="page-grid">
        <div class="page-panel">
          <div class="panel-title">{{ $t('accounts.listTitle') }}</div>
          <div v-if="!items.length" class="panel-empty">{{ $t('accounts.empty') }}</div>
          <div v-else class="panel-list">
            <div v-for="account in items" :key="account.id" class="panel-item">
              <div v-if="editingId === account.id" class="panel-edit">
                <label class="panel-label" :for="`account-name-${account.id}`">{{ $t('accounts.name') }}</label>
                <input :id="`account-name-${account.id}`" v-model="editName" class="panel-input" type="text" />

                <label class="panel-label" :for="`account-type-${account.id}`">{{ $t('accounts.type') }}</label>
                <select :id="`account-type-${account.id}`" v-model="editType" class="panel-input">
                  <option value="BANK">{{ $t('accounts.types.bank') }}</option>
                  <option value="CASH">{{ $t('accounts.types.cash') }}</option>
                  <option value="CREDIT_CARD">{{ $t('accounts.types.creditCard') }}</option>
                  <option value="LOAN">{{ $t('accounts.types.loan') }}</option>
                </select>

                <label class="panel-label" :for="`account-currency-${account.id}`">{{ $t('accounts.currency') }}</label>
                <input :id="`account-currency-${account.id}`" v-model="editCurrency" class="panel-input" type="text" maxlength="3" />

                <div class="panel-actions">
                  <button class="panel-action" type="button" @click="saveEdit">
                    {{ $t('accounts.save') }}
                  </button>
                  <button class="panel-action" type="button" @click="cancelEdit">
                    {{ $t('accounts.cancel') }}
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="panel-item-title">{{ account.name }}</div>
                <div class="panel-item-meta">{{ account.type }} · {{ account.currency || $t('accounts.currencyFallback') }}</div>
              </div>
              <div class="panel-actions" v-if="editingId !== account.id">
                <button class="panel-action" type="button" @click="startEdit(account)">
                  {{ $t('accounts.edit') }}
                </button>
                <button class="panel-action" type="button" @click="archiveAccount(account.id)">
                  {{ $t('accounts.archive') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="page-panel">
          <div class="panel-title">{{ $t('accounts.createTitle') }}</div>
          <form class="panel-form" @submit.prevent="onCreate">
            <label class="panel-label" for="account-name">{{ $t('accounts.name') }}</label>
            <input id="account-name" v-model="name" class="panel-input" type="text" />

            <label class="panel-label" for="account-type">{{ $t('accounts.type') }}</label>
            <select id="account-type" v-model="type" class="panel-input">
              <option value="BANK">{{ $t('accounts.types.bank') }}</option>
              <option value="CASH">{{ $t('accounts.types.cash') }}</option>
              <option value="CREDIT_CARD">{{ $t('accounts.types.creditCard') }}</option>
              <option value="LOAN">{{ $t('accounts.types.loan') }}</option>
            </select>

            <label class="panel-label" for="account-currency">{{ $t('accounts.currency') }}</label>
            <input id="account-currency" v-model="currency" class="panel-input" type="text" maxlength="3" />

            <button class="panel-button" type="submit" :disabled="isSaving">
              {{ $t('accounts.createAction') }}
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
const type = ref('BANK');
const currency = ref('');
const isSaving = ref(false);
const editingId = ref('');
const editName = ref('');
const editType = ref('BANK');
const editCurrency = ref('');

const loadAccounts = async () => {
  if (!householdsStore.currentId) return;
  try {
    const data = await apiRequest(`/households/${householdsStore.currentId}/accounts`, { method: 'GET' });
    items.value = Array.isArray(data) ? data : [];
  } catch {
    items.value = [];
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
    const response = await apiRequest(`/households/${householdsStore.currentId}/accounts`, {
      method: 'POST',
      body: JSON.stringify({
        name: name.value.trim(),
        type: type.value,
        currency: currency.value.trim() || undefined
      })
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    name.value = '';
    currency.value = '';
    await loadAccounts();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  } finally {
    isSaving.value = false;
  }
};

const startEdit = (account) => {
  editingId.value = account.id;
  editName.value = account.name || '';
  editType.value = account.type || 'BANK';
  editCurrency.value = account.currency || '';
};

const cancelEdit = () => {
  editingId.value = '';
  editName.value = '';
  editType.value = 'BANK';
  editCurrency.value = '';
};

const saveEdit = async () => {
  if (!editingId.value || !householdsStore.currentId) return;
  if (!editName.value.trim()) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  try {
    const response = await apiRequest(`/accounts/${editingId.value}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: editName.value.trim(),
        type: editType.value,
        currency: editCurrency.value.trim() || undefined
      })
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    cancelEdit();
    await loadAccounts();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  }
};

const archiveAccount = async (id) => {
  if (!householdsStore.currentId) return;
  try {
    const response = await apiRequest(`/accounts/${id}`, { method: 'DELETE' });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    await loadAccounts();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  }
};

watch(
  () => householdsStore.currentId,
  () => {
    loadAccounts();
  }
);

onMounted(() => {
  householdsStore.load();
  loadAccounts();
});
</script>
