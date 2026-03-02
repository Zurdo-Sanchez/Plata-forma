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
              <div v-if="editingId === loan.id" class="panel-edit">
                <label class="panel-label" :for="`loan-name-${loan.id}`">{{ $t('loans.name') }}</label>
                <input :id="`loan-name-${loan.id}`" v-model="editName" class="panel-input" type="text" />

                <label class="panel-label" :for="`loan-principal-${loan.id}`">{{ $t('loans.principal') }}</label>
                <input :id="`loan-principal-${loan.id}`" v-model="editPrincipal" class="panel-input" type="number" step="0.01" />

                <label class="panel-label" :for="`loan-rate-${loan.id}`">{{ $t('loans.rate') }}</label>
                <input :id="`loan-rate-${loan.id}`" v-model.number="editRate" class="panel-input" type="number" step="1" />

                <label class="panel-label" :for="`loan-start-${loan.id}`">{{ $t('loans.startDate') }}</label>
                <input :id="`loan-start-${loan.id}`" v-model="editStartDate" class="panel-input" type="date" />

                <label class="panel-label" :for="`loan-term-${loan.id}`">{{ $t('loans.term') }}</label>
                <input :id="`loan-term-${loan.id}`" v-model.number="editTermMonths" class="panel-input" type="number" min="1" />

                <div class="panel-actions">
                  <button class="panel-action" type="button" @click="saveEdit">
                    {{ $t('loans.save') }}
                  </button>
                  <button class="panel-action" type="button" @click="cancelEdit">
                    {{ $t('loans.cancel') }}
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="panel-item-title">{{ loan.name }}</div>
                <div class="panel-item-meta">
                  {{ $t('loans.principalLabel') }} {{ formatCurrency(loan.principalAmount) }} · {{ $t('loans.rateLabel') }}
                  {{ loan.interestRateBps }} bps
                </div>
              </div>
              <div class="panel-actions" v-if="editingId !== loan.id">
                <button class="panel-action" type="button" @click="startEdit(loan)">
                  {{ $t('loans.edit') }}
                </button>
                <button class="panel-action" type="button" @click="deleteLoan(loan.id)">
                  {{ $t('loans.delete') }}
                </button>
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
            <input id="loan-principal" v-model="principalAmount" class="panel-input" type="number" step="0.01" />

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
const editingId = ref('');
const editName = ref('');
const editPrincipal = ref('');
const editRate = ref(0);
const editStartDate = ref('');
const editTermMonths = ref(12);

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

const loadLoans = async () => {
  if (!householdsStore.currentId) return;
  try {
    const data = await apiRequest(`/households/${householdsStore.currentId}/loans`, { method: 'GET' });
    items.value = Array.isArray(data) ? data : [];
  } catch {
    items.value = [];
  }
};

const startEdit = (loan) => {
  editingId.value = loan.id;
  editName.value = loan.name || '';
  editPrincipal.value = formatAmountInput(loan.principalAmount ?? 0);
  editRate.value = loan.interestRateBps ?? 0;
  editStartDate.value = loan.startDate ? String(loan.startDate).slice(0, 10) : '';
  editTermMonths.value = loan.termMonths ?? 12;
};

const cancelEdit = () => {
  editingId.value = '';
  editName.value = '';
  editPrincipal.value = '';
  editRate.value = 0;
  editStartDate.value = '';
  editTermMonths.value = 12;
};

const saveEdit = async () => {
  if (!editingId.value || !householdsStore.currentId) return;
  if (!editName.value.trim() || !editStartDate.value) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  const normalizedPrincipal = normalizeAmount(editPrincipal.value);
  if (!normalizedPrincipal) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  try {
    const response = await apiRequest(`/loans/${editingId.value}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: editName.value.trim(),
        principalAmount: normalizedPrincipal,
        interestRateBps: editRate.value || 0,
        startDate: editStartDate.value,
        termMonths: editTermMonths.value || undefined
      })
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    cancelEdit();
    await loadLoans();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  }
};

const deleteLoan = async (id) => {
  if (!householdsStore.currentId) return;
  try {
    const response = await apiRequest(`/loans/${id}`, { method: 'DELETE' });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    await loadLoans();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
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
