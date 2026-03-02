<template>
  <q-page class="app-page">
    <section class="page-card">
      <header class="page-header">
        <div>
          <div class="page-kicker">{{ $t('creditCards.kicker') }}</div>
          <h1>{{ $t('creditCards.title') }}</h1>
          <p>{{ $t('creditCards.subtitle') }}</p>
        </div>
      </header>

      <div v-if="!householdsStore.currentId" class="page-empty">
        {{ $t('creditCards.selectHousehold') }}
      </div>

      <div v-else class="page-grid">
        <div class="page-panel">
          <div class="panel-title">{{ $t('creditCards.listTitle') }}</div>
          <div v-if="!items.length" class="panel-empty">{{ $t('creditCards.empty') }}</div>
          <div v-else class="panel-list">
            <div v-for="card in items" :key="card.id" class="panel-item">
              <div v-if="editingId === card.id" class="panel-edit">
                <label class="panel-label" :for="`card-name-${card.id}`">{{ $t('creditCards.name') }}</label>
                <input :id="`card-name-${card.id}`" v-model="editName" class="panel-input" type="text" />

                <label class="panel-label" :for="`card-closing-${card.id}`">{{ $t('creditCards.closingDay') }}</label>
                <input
                  :id="`card-closing-${card.id}`"
                  v-model.number="editClosingDay"
                  class="panel-input"
                  type="number"
                  min="1"
                  max="28"
                />

                <label class="panel-label" :for="`card-due-${card.id}`">{{ $t('creditCards.dueDay') }}</label>
                <input
                  :id="`card-due-${card.id}`"
                  v-model.number="editDueDay"
                  class="panel-input"
                  type="number"
                  min="1"
                  max="28"
                />

                <label class="panel-label" :for="`card-limit-${card.id}`">{{ $t('creditCards.limitAmount') }}</label>
                <input :id="`card-limit-${card.id}`" v-model="editLimitAmount" class="panel-input" type="number" step="0.01" />

                <div class="panel-actions">
                  <button class="panel-action" type="button" @click="saveEdit">
                    {{ $t('creditCards.save') }}
                  </button>
                  <button class="panel-action" type="button" @click="cancelEdit">
                    {{ $t('creditCards.cancel') }}
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="panel-item-title">{{ card.name }}</div>
                <div class="panel-item-meta">
                  {{ $t('creditCards.closingDayLabel') }} {{ card.closingDay }} ·
                  {{ $t('creditCards.dueDayLabel') }} {{ card.dueDay }}
                </div>
              </div>
              <div class="panel-actions" v-if="editingId !== card.id">
                <button class="panel-action" type="button" @click="startEdit(card)">
                  {{ $t('creditCards.edit') }}
                </button>
                <button class="panel-action" type="button" @click="deleteCard(card.id)">
                  {{ $t('creditCards.delete') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="page-panel">
          <div class="panel-title">{{ $t('creditCards.createTitle') }}</div>
          <form class="panel-form" @submit.prevent="onCreate">
            <label class="panel-label" for="card-name">{{ $t('creditCards.name') }}</label>
            <input id="card-name" v-model="name" class="panel-input" type="text" />

            <label class="panel-label" for="card-closing">{{ $t('creditCards.closingDay') }}</label>
            <input id="card-closing" v-model.number="closingDay" class="panel-input" type="number" min="1" max="28" />

            <label class="panel-label" for="card-due">{{ $t('creditCards.dueDay') }}</label>
            <input id="card-due" v-model.number="dueDay" class="panel-input" type="number" min="1" max="28" />

            <label class="panel-label" for="card-limit">{{ $t('creditCards.limitAmount') }}</label>
            <input id="card-limit" v-model="limitAmount" class="panel-input" type="number" step="0.01" />

            <button class="panel-button" type="submit" :disabled="isSaving">
              {{ $t('creditCards.createAction') }}
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
const closingDay = ref(1);
const dueDay = ref(10);
const limitAmount = ref('');
const isSaving = ref(false);
const editingId = ref('');
const editName = ref('');
const editClosingDay = ref(1);
const editDueDay = ref(10);
const editLimitAmount = ref('');

const formatAmountInput = (amountValue) => {
  let amount = BigInt(0);
  try {
    amount = BigInt(String(amountValue ?? 0));
  } catch {
    amount = BigInt(0);
  }
  const isNegative = amount < BigInt(0);
  const absolute = isNegative ? -amount : amount;
  const whole = absolute / BigInt(100);
  const fraction = (absolute % BigInt(100)).toString().padStart(2, '0');
  return `${isNegative ? '-' : ''}${whole.toString()}.${fraction}`;
};

const normalizeAmount = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return null;
  let normalized = raw.replace(/[^0-9,.\-]/g, '');
  const hasComma = normalized.includes(',');
  const hasDot = normalized.includes('.');
  if (hasComma && hasDot) {
    normalized =
      normalized.lastIndexOf(',') > normalized.lastIndexOf('.')
        ? normalized.replace(/\./g, '').replace(',', '.')
        : normalized.replace(/,/g, '');
  } else if (hasComma && !hasDot) {
    normalized = normalized.replace(',', '.');
  }
  const numeric = Number(normalized);
  if (!Number.isFinite(numeric)) return null;
  return Math.abs(numeric).toFixed(2);
};

const loadCards = async () => {
  if (!householdsStore.currentId) return;
  try {
    const data = await apiRequest(`/households/${householdsStore.currentId}/credit-cards`, { method: 'GET' });
    items.value = Array.isArray(data) ? data : [];
  } catch {
    items.value = [];
  }
};

const startEdit = (card) => {
  editingId.value = card.id;
  editName.value = card.name || '';
  editClosingDay.value = card.closingDay ?? 1;
  editDueDay.value = card.dueDay ?? 10;
  editLimitAmount.value = formatAmountInput(card.limitAmount ?? 0);
};

const cancelEdit = () => {
  editingId.value = '';
  editName.value = '';
  editClosingDay.value = 1;
  editDueDay.value = 10;
  editLimitAmount.value = '';
};

const saveEdit = async () => {
  if (!editingId.value || !householdsStore.currentId) return;
  if (!editName.value.trim()) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  const normalizedLimit = normalizeAmount(editLimitAmount.value);
  if (editLimitAmount.value && !normalizedLimit) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  try {
    const response = await apiRequest(`/credit-cards/${editingId.value}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: editName.value.trim(),
        closingDay: editClosingDay.value,
        dueDay: editDueDay.value,
        limitAmount: normalizedLimit || undefined
      })
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    cancelEdit();
    await loadCards();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  }
};

const deleteCard = async (id) => {
  if (!householdsStore.currentId) return;
  try {
    const response = await apiRequest(`/credit-cards/${id}`, { method: 'DELETE' });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    await loadCards();
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
  const normalizedLimit = normalizeAmount(limitAmount.value);
  if (limitAmount.value && !normalizedLimit) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  isSaving.value = true;
  try {
    const response = await apiRequest(`/households/${householdsStore.currentId}/credit-cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: name.value.trim(),
        closingDay: closingDay.value,
        dueDay: dueDay.value,
        limitAmount: normalizedLimit || undefined
      })
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    name.value = '';
    limitAmount.value = '';
    await loadCards();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  } finally {
    isSaving.value = false;
  }
};

watch(
  () => householdsStore.currentId,
  () => {
    loadCards();
  }
);

onMounted(() => {
  householdsStore.load();
  loadCards();
});
</script>
