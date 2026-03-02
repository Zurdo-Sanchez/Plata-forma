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
          <div class="panel-title-row">
            <div class="panel-title">{{ $t('transactions.listTitle') }}</div>
            <button class="panel-action" type="button" @click="openImport">
              {{ $t('transactions.import') }}
            </button>
          </div>
          <div v-if="!items.length" class="panel-empty">{{ $t('transactions.empty') }}</div>
          <div v-else class="panel-list">
            <div v-for="tx in items" :key="tx.id" class="panel-item">
              <div>
                <div class="panel-item-title">{{ tx.description || $t('transactions.noDescription') }}</div>
                <div class="panel-item-meta">
                  {{ formatDate(tx.date) }} · {{ originSummary(tx) }}
                </div>
              </div>
              <div class="panel-item-amount">{{ formatCurrency(transactionAmount(tx)) }}</div>
              <div class="panel-actions">
                <button
                  v-if="canEdit(tx)"
                  class="panel-action icon-button"
                  type="button"
                  :aria-label="$t('transactions.edit')"
                  @click="startEdit(tx)"
                >
                  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M3 17.25V21h3.75L18.81 8.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l9.06-9.06.92.92L5.92 20.08zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  class="panel-action icon-button"
                  type="button"
                  :aria-label="$t('transactions.delete')"
                  @click="removeTransaction(tx.id)"
                >
                  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M6 7h12v2H6V7zm2 3h8l-.7 10.4c-.05.87-.78 1.56-1.65 1.56H10.35c-.87 0-1.6-.69-1.65-1.56L8 10zm3-6h2a1 1 0 011 1v1H10V5a1 1 0 011-1z"
                      fill="currentColor"
                    />
                  </svg>
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

            <label class="panel-label" for="tx-origin">{{ $t('transactions.origin') }}</label>
            <div class="panel-row">
              <select id="tx-origin-filter" v-model="originFilter" class="panel-input">
                <option value="ALL">{{ $t('transactions.filterAll') }}</option>
                <option value="ACCOUNTS">{{ $t('transactions.filterAccounts') }}</option>
                <option value="CARDS">{{ $t('transactions.filterCards') }}</option>
                <option value="CATEGORIES">{{ $t('transactions.filterCategories') }}</option>
              </select>
              <select id="tx-origin" v-model="originValue" class="panel-input">
                <option disabled value="">{{ $t('transactions.origin') }}</option>
                <option v-for="option in originOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <label class="panel-label" for="tx-destination">{{ $t('transactions.destination') }}</label>
            <div class="panel-row">
              <select id="tx-destination-filter" v-model="destinationFilter" class="panel-input">
                <option value="ALL">{{ $t('transactions.filterAll') }}</option>
                <option value="ACCOUNTS">{{ $t('transactions.filterAccounts') }}</option>
                <option value="CARDS">{{ $t('transactions.filterCards') }}</option>
                <option value="CATEGORIES">{{ $t('transactions.filterCategories') }}</option>
              </select>
              <select id="tx-destination" v-model="destinationValue" class="panel-input">
                <option disabled value="">{{ $t('transactions.destination') }}</option>
                <option v-for="option in destinationOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <label class="panel-label" for="tx-amount">{{ $t('transactions.amount') }}</label>
            <input id="tx-amount" v-model="amount" class="panel-input" type="number" step="0.01" />

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

    <div v-if="showImport" class="modal-backdrop">
      <div class="modal-card">
        <div class="modal-title">{{ $t('transactions.importTitle') }}</div>
        <div class="modal-body">
          <label class="panel-label" for="import-file">{{ $t('transactions.importFile') }}</label>
          <input
            id="import-file"
            ref="importInput"
            class="panel-input"
            type="file"
            accept=".xlsx,.xls"
            @change="onImportFile"
          />

          <label class="panel-label" for="import-origin">{{ $t('transactions.origin') }}</label>
          <select id="import-origin" v-model="importOrigin" class="panel-input">
            <option disabled value="">{{ $t('transactions.origin') }}</option>
            <option v-for="option in importOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <div v-if="importRows.length" class="import-list">
            <div class="import-row import-header">
              <div>#</div>
              <div>{{ $t('transactions.importDate') }}</div>
              <div>{{ $t('transactions.importConcept') }}</div>
              <div>{{ $t('transactions.importAmount') }}</div>
              <div>{{ $t('transactions.destination') }}</div>
            </div>
            <div v-for="(row, index) in importRows" :key="row.id" class="import-row">
              <div class="import-index">{{ index + 1 }}</div>
              <div>{{ row.date }}</div>
              <div class="import-concept">{{ row.description || '-' }}</div>
              <div>{{ formatCurrency(parseAmountToCents(row.amount)) }}</div>
              <div>
                <select v-model="row.destination" class="panel-input">
                  <option disabled value="">{{ $t('transactions.destination') }}</option>
                  <option v-for="option in importOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="importRows.length" class="import-hint">
            {{ $t('transactions.importMissing') }}: {{ importMissing }}
          </div>
          <div v-else class="panel-empty">{{ $t('transactions.importEmpty') }}</div>
        </div>
        <div class="modal-actions">
          <button class="panel-button" type="button" @click="closeImport">
            {{ $t('transactions.cancelAction') }}
          </button>
          <button class="panel-button" type="button" :disabled="isImporting || !importReady" @click="runImport">
            {{ isImporting ? $t('transactions.importing') : $t('transactions.importStart') }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showImportSummary" class="modal-backdrop">
      <div class="modal-card">
        <div class="modal-title">{{ $t('transactions.importSummaryTitle') }}</div>
        <div class="modal-body">
          <div class="summary-row">
            <span>{{ $t('transactions.importSummaryImported') }}</span>
            <strong>{{ importSummary.imported }}</strong>
          </div>
          <div class="summary-row">
            <span>{{ $t('transactions.importSummarySkipped') }}</span>
            <strong>{{ importSummary.skipped }}</strong>
          </div>
          <div class="summary-row">
            <span>{{ $t('transactions.importSummaryFailed') }}</span>
            <strong>{{ importSummary.failed }}</strong>
          </div>
        </div>
        <div class="modal-actions">
          <button class="panel-button" type="button" @click="closeImportSummary">
            {{ $t('transactions.importSummaryClose') }}
          </button>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { Notify } from 'quasar';
import { t } from '../i18n';
import { apiRequest } from '../composables/apiClient';
import { useHouseholdsStore } from '../stores/households';
import pinia from '../stores/pinia';
import * as XLSX from 'xlsx';

const $t = t;
const householdsStore = useHouseholdsStore(pinia);
const items = ref([]);
const accounts = ref([]);
const categories = ref([]);
const date = ref(new Date().toISOString().slice(0, 10));
const description = ref('');
const originValue = ref('');
const destinationValue = ref('');
const originFilter = ref('ALL');
const destinationFilter = ref('ALL');
const amount = ref('');
const memo = ref('');
const isSaving = ref(false);
const editingId = ref('');
const isEditing = computed(() => Boolean(editingId.value));
const accountOptions = computed(() =>
  accounts.value
    .filter((account) => account.type !== 'CREDIT_CARD')
    .map((account) => ({ value: `ACCOUNT:${account.id}`, label: account.name }))
);
const cardOptions = computed(() =>
  accounts.value
    .filter((account) => account.type === 'CREDIT_CARD')
    .map((account) => ({ value: `ACCOUNT:${account.id}`, label: account.name }))
);
const categoryOptions = computed(() =>
  categories.value.map((category) => ({ value: `CATEGORY:${category.id}`, label: category.name }))
);
const resolveOptions = (filterValue) => {
  if (filterValue === 'ACCOUNTS') return accountOptions.value;
  if (filterValue === 'CARDS') return cardOptions.value;
  if (filterValue === 'CATEGORIES') return categoryOptions.value;
  return [...accountOptions.value, ...cardOptions.value, ...categoryOptions.value];
};
const originOptions = computed(() => resolveOptions(originFilter.value));
const destinationOptions = computed(() => resolveOptions(destinationFilter.value));
const accountMap = computed(() => new Map(accounts.value.map((account) => [account.id, account.name])));
const categoryMap = computed(() => new Map(categories.value.map((category) => [category.id, category.name])));
const importInput = ref(null);
const showImport = ref(false);
const showImportSummary = ref(false);
const importOrigin = ref('');
const importDestination = ref('');
const isImporting = ref(false);
const importSummary = ref({ imported: 0, skipped: 0, failed: 0 });
const importOptions = computed(() => [...accountOptions.value, ...cardOptions.value, ...categoryOptions.value]);

const formatDate = (value) => {
  try {
    const dateValue = new Date(value);
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(dateValue);
  } catch {
    return value;
  }
};

const resolveCurrency = () => householdsStore.currentHousehold?.currency || 'EUR';

const toBigInt = (value) => {
  if (typeof value === 'bigint') return value;
  if (value === null || value === undefined || value === '') return BigInt(0);
  if (typeof value === 'number' && Number.isFinite(value)) return BigInt(Math.trunc(value));
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^\d-]/g, '');
    if (!cleaned) return BigInt(0);
    try {
      return BigInt(cleaned);
    } catch {
      return BigInt(0);
    }
  }
  return BigInt(0);
};

const formatCurrency = (amountBigint) => {
  const safeAmount = toBigInt(amountBigint);
  const currency = resolveCurrency();
  const isNegative = safeAmount < BigInt(0);
  const absolute = isNegative ? -safeAmount : safeAmount;
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

const formatAmountInput = (amountBigint) => {
  const safeAmount = toBigInt(amountBigint);
  const isNegative = safeAmount < BigInt(0);
  const absolute = isNegative ? -safeAmount : safeAmount;
  const whole = absolute / BigInt(100);
  const fraction = (absolute % BigInt(100)).toString().padStart(2, '0');
  return `${isNegative ? '-' : ''}${whole.toString()}.${fraction}`;
};

const transactionAmount = (tx) => {
  const lines = Array.isArray(tx?.lines) ? tx.lines : [];
  let positiveSum = BigInt(0);
  let negativeSum = BigInt(0);
  for (const line of lines) {
    const raw = line?.amount;
    if (raw === undefined || raw === null) continue;
    try {
      const value = BigInt(String(raw));
      if (value >= BigInt(0)) positiveSum += value;
      else negativeSum += -value;
    } catch {
      // ignore invalid values
    }
  }
  const amount = positiveSum > BigInt(0) ? positiveSum : negativeSum;
  return amount;
};

const resolveLineLabel = (line) => {
  if (line?.categoryId) {
    return categoryMap.value.get(line.categoryId) || line.categoryId;
  }
  return accountMap.value.get(line?.accountId) || line?.accountId || '';
};

const getMonthKey = (value) => {
  try {
    const dateValue = new Date(value);
    return dateValue.toISOString().slice(0, 7);
  } catch {
    return '';
  }
};

const balancesByMonth = ref({});

const loadBalancesForMonth = async (monthKey) => {
  if (!monthKey || !householdsStore.currentId || balancesByMonth.value[monthKey]) return;
  try {
    const data = await apiRequest(
      `/households/${householdsStore.currentId}/transactions/balances?month=${encodeURIComponent(monthKey)}`,
      { method: 'GET' }
    );
    balancesByMonth.value[monthKey] = data || { accounts: {}, categories: {} };
  } catch {
    balancesByMonth.value[monthKey] = { accounts: {}, categories: {} };
  }
};

const resolveOriginBalance = (tx, originLine) => {
  const monthKey = getMonthKey(tx?.date);
  const bucket = balancesByMonth.value[monthKey];
  if (!bucket) return BigInt(0);
  if (originLine?.categoryId) {
    const raw = bucket.categories?.[originLine.categoryId];
    return raw !== undefined ? BigInt(String(raw)) : BigInt(0);
  }
  const raw = bucket.accounts?.[originLine?.accountId];
  return raw !== undefined ? BigInt(String(raw)) : BigInt(0);
};

const originSummary = (tx) => {
  const lines = Array.isArray(tx?.lines) ? tx.lines : [];
  const originLine = lines.find((line) => String(line.amount).startsWith('-'));
  const destinationLine = lines.find((line) => !String(line.amount).startsWith('-'));
  if (!originLine || !destinationLine) return `${tx.lines?.length || 0} ${$t('transactions.lines')}`;
  const originAmount = resolveOriginBalance(tx, originLine);
  const originLabel = resolveLineLabel(originLine);
  const destinationLabel = resolveLineLabel(destinationLine);
  return `${originLabel} → ${destinationLabel} (${formatCurrency(originAmount)})`;
};

const openImport = () => {
  showImport.value = true;
  importOrigin.value = '';
  importDestination.value = '';
  importRows.value = [];
  if (importInput.value) importInput.value.value = '';
};

const closeImport = () => {
  showImport.value = false;
};

const closeImportSummary = () => {
  showImportSummary.value = false;
};

const normalizeHeader = (value) => String(value || '').trim().toLowerCase();

const parseDateValue = (value) => {
  if (!value) return null;
  if (typeof value === 'number' && Number.isFinite(value)) {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const date = new Date(excelEpoch.getTime() + value * 86400000);
    if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  let raw = String(value).trim();
  if (!raw) return null;
  if (raw.includes('|')) raw = raw.split('|')[0].trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
  const match = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = match[2].padStart(2, '0');
    const year = match[3].length === 2 ? `20${match[3]}` : match[3];
    return `${year}-${month}-${day}`;
  }
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  return null;
};

const parseExcelFile = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const matrix = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  const headerIndex = matrix.findIndex((row) =>
    row.some((cell) => {
      const key = normalizeHeader(cell);
      return key.includes('fecha operacion') || key.includes('fecha operación') || key.includes('concepto');
    })
  );

  if (headerIndex >= 0) {
    const headers = matrix[headerIndex].map((cell) => normalizeHeader(cell));
    const dataRows = matrix.slice(headerIndex + 1).filter((row) => row.some((cell) => String(cell).trim() !== ''));
    const mapped = dataRows.map((row, index) => {
      const normalized = {};
      headers.forEach((header, idx) => {
        if (!header) return;
        normalized[header] = row[idx];
      });
      const date = parseDateValue(
        normalized['fecha operacion'] ||
          normalized['fecha operación'] ||
          normalized['fecha'] ||
          normalized['date']
      );
      const description = String(
        normalized['concepto'] || normalized['concept'] || normalized['descripcion'] || normalized['descripción'] || ''
      ).trim();
      const amount = resolveAmount(
        normalized['importe eur'] || normalized['importe'] || normalized['amount'] || normalized['monto']
      );
      return {
        id: `${headerIndex}-${index}-${date || 'row'}`,
        date,
        description,
        amount,
        destination: '',
        raw: normalized,
      };
    });
    return mapped.filter((row) => row.date && row.amount !== null);
  }

  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  const mapped = rows.map((row, index) => {
    const normalized = {};
    for (const [key, value] of Object.entries(row)) {
      normalized[normalizeHeader(key)] = value;
    }
    const date = parseDateValue(
      normalized['fecha operacion'] ||
        normalized['fecha operación'] ||
        normalized['fecha'] ||
        normalized['date']
    );
    const description = String(
      normalized['concepto'] || normalized['concept'] || normalized['descripcion'] || normalized['descripción'] || ''
    ).trim();
    const amount = resolveAmount(
      normalized['importe eur'] || normalized['importe'] || normalized['amount'] || normalized['monto']
    );
    return {
      id: `${index}-${date || 'row'}`,
      date,
      description,
      amount,
      destination: '',
      raw: normalized,
    };
  });
  return mapped.filter((row) => row.date && row.amount !== null);
};

const onImportFile = async (event) => {
  const file = event.target?.files?.[0];
  if (!file) return;
  try {
    const parsed = await parseExcelFile(file);
    importRows.value = parsed;
    Notify.create({ type: 'positive', message: `${$t('transactions.importLoaded')}: ${file.name}` });
  } catch (error) {
    importRows.value = [];
    Notify.create({ type: 'negative', message: error?.message || $t('transactions.importFailed') });
  }
};

const importRows = ref([]);
const importReady = computed(() => {
  if (!importOrigin.value || !importRows.value.length) return false;
  return importRows.value.every((row) => row.destination && row.date && row.amount !== null);
});
const importMissing = computed(() => importRows.value.filter((row) => !row.destination).length);

const parseAmountToCents = (value) => {
  if (value === null || value === undefined || value === '') return BigInt(0);
  if (typeof value === 'number' && Number.isFinite(value)) {
    return BigInt(Math.round(value * 100));
  }
  let raw = String(value).trim();
  if (!raw) return BigInt(0);
  raw = raw.replace(/[^0-9,.\-]/g, '');
  const hasComma = raw.includes(',');
  const hasDot = raw.includes('.');
  if (hasComma && hasDot) {
    if (raw.lastIndexOf(',') > raw.lastIndexOf('.')) {
      raw = raw.replace(/\./g, '').replace(',', '.');
    } else {
      raw = raw.replace(/,/g, '');
    }
  } else if (hasComma && !hasDot) {
    raw = raw.replace(',', '.');
  }
  const numeric = Number(raw);
  if (!Number.isFinite(numeric)) return BigInt(0);
  return BigInt(Math.round(numeric * 100));
};

const resolveAmount = (value) => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.abs(value).toFixed(2);
  }
  let raw = String(value).trim();
  if (!raw) return null;
  raw = raw.replace(/[^0-9,.\-]/g, '');
  const hasComma = raw.includes(',');
  const hasDot = raw.includes('.');
  if (hasComma && hasDot) {
    if (raw.lastIndexOf(',') > raw.lastIndexOf('.')) {
      raw = raw.replace(/\./g, '').replace(',', '.');
    } else {
      raw = raw.replace(/,/g, '');
    }
  } else if (hasComma && !hasDot) {
    raw = raw.replace(',', '.');
  }
  const numeric = Number(raw);
  if (!Number.isFinite(numeric)) return null;
  return Math.abs(numeric).toFixed(2);
};

const runImport = async () => {
  if (!importOrigin.value || !importRows.value.length || !householdsStore.currentId) {
    Notify.create({ type: 'negative', message: $t('app.errors.required') });
    return;
  }
  const [fromKind, fromId] = importOrigin.value.split(':');
  if (!fromKind || !fromId) {
    Notify.create({ type: 'negative', message: $t('app.errors.required') });
    return;
  }

  isImporting.value = true;
  const summary = { imported: 0, skipped: 0, failed: 0 };
  try {
    for (const row of importRows.value) {
      const [toKind, toId] = row.destination.split(':');
      if (!toKind || !toId || !row.date || !row.amount) continue;

      const payload = {
        date: row.date,
        description: row.description || undefined,
        entry: {
          from: { kind: fromKind, id: fromId },
          to: { kind: toKind, id: toId },
          amount: row.amount,
          memo: row.description || undefined
        }
      };
      try {
        await apiRequest(`/households/${householdsStore.currentId}/transactions`, {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        summary.imported += 1;
      } catch (error) {
        if (error?.status === 409) {
          summary.skipped += 1;
        } else {
          summary.failed += 1;
        }
      }
    }
    importSummary.value = summary;
    closeImport();
    showImportSummary.value = true;
    await loadTransactions();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || $t('transactions.importFailed') });
  } finally {
    isImporting.value = false;
  }
};

const loadTransactions = async () => {
  if (!householdsStore.currentId) return;
  try {
    const data = await apiRequest(`/households/${householdsStore.currentId}/transactions`, { method: 'GET' });
    items.value = Array.isArray(data) ? data : [];
    const months = [...new Set(items.value.map((tx) => getMonthKey(tx.date)).filter(Boolean))];
    await Promise.all(months.map((monthKey) => loadBalancesForMonth(monthKey)));
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

const resetForm = () => {
  date.value = new Date().toISOString().slice(0, 10);
  description.value = '';
  originValue.value = '';
  destinationValue.value = '';
  originFilter.value = 'ALL';
  destinationFilter.value = 'ALL';
  amount.value = '';
  memo.value = '';
};

const canEdit = (tx) => {
  const lines = Array.isArray(tx?.lines) ? tx.lines : [];
  if (lines.length !== 2) return false;
  const negatives = lines.filter((line) => String(line.amount).startsWith('-'));
  const positives = lines.filter((line) => !String(line.amount).startsWith('-'));
  return negatives.length === 1 && positives.length === 1;
};

const startEdit = (tx) => {
  if (!canEdit(tx)) return;
  const fromLine = tx.lines.find((item) => String(item.amount).startsWith('-'));
  const toLine = tx.lines.find((item) => !String(item.amount).startsWith('-'));
  if (!fromLine || !toLine) return;
  const fromKind = fromLine.categoryId ? 'CATEGORY' : 'ACCOUNT';
  const toKind = toLine.categoryId ? 'CATEGORY' : 'ACCOUNT';
  const fromId = fromKind === 'CATEGORY' ? fromLine.categoryId : fromLine.accountId;
  const toId = toKind === 'CATEGORY' ? toLine.categoryId : toLine.accountId;
  if (!fromId || !toId) return;
  editingId.value = tx.id;
  date.value = String(tx.date).slice(0, 10);
  description.value = tx.description || '';
  originValue.value = `${fromKind}:${fromId}`;
  destinationValue.value = `${toKind}:${toId}`;
  originFilter.value = 'ALL';
  destinationFilter.value = 'ALL';
  const amountStr = formatAmountInput(fromLine.amount);
  amount.value = amountStr.replace('-', '');
  memo.value = fromLine.memo || '';
};

const cancelEdit = () => {
  editingId.value = '';
  resetForm();
};

const onSubmit = async () => {
  if (isSaving.value || !householdsStore.currentId) return;
  const normalizedAmount = normalizeAmount(amount.value);
  if (!date.value || !originValue.value || !destinationValue.value || !normalizedAmount) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  const [fromKind, fromId] = originValue.value.split(':');
  const [toKind, toId] = destinationValue.value.split(':');
  if (!fromKind || !fromId || !toKind || !toId) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  isSaving.value = true;
  try {
    const payload = {
      date: date.value,
      description: description.value.trim() || undefined,
      entry: {
        from: { kind: fromKind, id: fromId },
        to: { kind: toKind, id: toId },
        amount: normalizedAmount,
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

watch(
  () => householdsStore.currentId,
  () => {
    balancesByMonth.value = {};
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

<style scoped>
.page-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 24px;
  align-items: start;
}
@media (max-width: 900px) {
  .page-grid {
    grid-template-columns: 1fr;
  }
}
.panel-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.panel-input-file {
  display: none;
}
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-card {
  background: #0f1220;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  width: min(920px, 96vw);
  max-height: 80vh;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
}
.modal-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}
.modal-body {
  display: grid;
  gap: 12px;
  overflow: auto;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}
.import-list {
  display: grid;
  gap: 8px;
  margin-top: 8px;
  max-height: 40vh;
  overflow: auto;
  padding-right: 4px;
}
.import-row {
  display: grid;
  grid-template-columns: 32px 100px minmax(160px, 1fr) 120px 180px;
  gap: 8px;
  align-items: center;
  min-width: 560px;
}
.import-header {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.import-row div {
  min-width: 0;
}
.import-index {
  color: rgba(255, 255, 255, 0.6);
  text-align: right;
}
.import-hint {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  text-align: right;
}
.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.import-concept {
  white-space: normal;
  word-break: break-word;
}
.panel-item-amount {
  font-size: 20px;
  font-weight: 600;
  margin-left: auto;
  text-align: right;
}
.panel-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
}
.icon {
  width: 18px;
  height: 18px;
}
</style>
