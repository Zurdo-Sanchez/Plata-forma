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
              <div>
                <div class="panel-item-title">{{ card.name }}</div>
                <div class="panel-item-meta">
                  {{ $t('creditCards.closingDayLabel') }} {{ card.closingDay }} ·
                  {{ $t('creditCards.dueDayLabel') }} {{ card.dueDay }}
                </div>
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
            <input id="card-limit" v-model="limitAmount" class="panel-input" type="number" step="1" />

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

const normalizeAmount = (value) => {
  const str = String(value ?? '').trim();
  if (!str) return null;
  if (!/^\d+$/.test(str)) return null;
  return str;
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
