<template>
  <q-page class="app-page">
    <section class="page-card">
      <header class="page-header">
        <div>
          <div class="page-kicker">{{ $t('loans.kicker') }}</div>
          <h1>{{ $t('loans.title') }}</h1>
          <p>{{ $t('loans.subtitle') }}</p>
        </div>
      </header>

      <div v-if="!householdsStore.currentId" class="page-empty">
        {{ $t('loans.selectHousehold') }}
      </div>

      <div v-else class="page-grid">
        <div class="page-panel">
          <div class="panel-title">{{ $t('loans.listTitle') }}</div>
          <div v-if="!items.length" class="panel-empty">{{ $t('loans.empty') }}</div>
          <div v-else class="panel-list">
            <div v-for="loan in items" :key="loan.id" class="panel-item">
              <div>
                <div class="panel-item-title">{{ loan.name }}</div>
                <div class="panel-item-meta">
                  {{ $t('loans.principalLabel') }} {{ loan.principalAmount }} · {{ $t('loans.rateLabel') }}
                  {{ loan.interestRateBps }} bps
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="page-panel">
          <div class="panel-title">{{ $t('loans.createTitle') }}</div>
          <form class="panel-form" @submit.prevent="onCreate">
            <label class="panel-label" for="loan-name">{{ $t('loans.name') }}</label>
            <input id="loan-name" v-model="name" class="panel-input" type="text" />

            <label class="panel-label" for="loan-principal">{{ $t('loans.principal') }}</label>
            <input id="loan-principal" v-model="principalAmount" class="panel-input" type="number" step="1" />

            <label class="panel-label" for="loan-rate">{{ $t('loans.rate') }}</label>
            <input id="loan-rate" v-model.number="interestRateBps" class="panel-input" type="number" step="1" />

            <label class="panel-label" for="loan-start">{{ $t('loans.startDate') }}</label>
            <input id="loan-start" v-model="startDate" class="panel-input" type="date" />

            <label class="panel-label" for="loan-term">{{ $t('loans.term') }}</label>
            <input id="loan-term" v-model.number="termMonths" class="panel-input" type="number" min="1" />

            <button class="panel-button" type="submit" :disabled="isSaving">
              {{ $t('loans.createAction') }}
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
const principalAmount = ref('');
const interestRateBps = ref(0);
const startDate = ref('');
const termMonths = ref(12);
const isSaving = ref(false);

const normalizeAmount = (value) => {
  const str = String(value ?? '').trim();
  if (!str) return null;
  if (!/^\d+$/.test(str)) return null;
  return str;
};

const loadLoans = async () => {
  if (!householdsStore.currentId) return;
  try {
    const data = await apiRequest(`/households/${householdsStore.currentId}/loans`, { method: 'GET' });
    items.value = Array.isArray(data) ? data : [];
  } catch {
    items.value = [];
  }
};

const onCreate = async () => {
  if (isSaving.value || !householdsStore.currentId) return;
  if (!name.value.trim() || !startDate.value) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  const normalizedPrincipal = normalizeAmount(principalAmount.value);
  if (!normalizedPrincipal) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  isSaving.value = true;
  try {
    const response = await apiRequest(`/households/${householdsStore.currentId}/loans`, {
      method: 'POST',
      body: JSON.stringify({
        name: name.value.trim(),
        principalAmount: normalizedPrincipal,
        interestRateBps: interestRateBps.value || 0,
        startDate: startDate.value,
        termMonths: termMonths.value || undefined
      })
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    name.value = '';
    principalAmount.value = '';
    await loadLoans();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  } finally {
    isSaving.value = false;
  }
};

watch(
  () => householdsStore.currentId,
  () => {
    loadLoans();
  }
);

onMounted(() => {
  householdsStore.load();
  loadLoans();
});
</script>
