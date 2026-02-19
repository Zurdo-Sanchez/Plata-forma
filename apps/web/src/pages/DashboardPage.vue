<template>
  <q-page class="dashboard-shell">
    <header class="dashboard-header">
      <div>
        <div class="dashboard-kicker">{{ $t('dashboard.kicker') }}</div>
        <div class="text-h4 text-weight-bold">{{ $t('dashboard.title') }}</div>
        <div class="dashboard-subtitle">
          {{ householdsStore.currentHousehold?.name || $t('dashboard.noHousehold') }}
        </div>
      </div>
      <div class="dashboard-actions">
        <button class="dashboard-logout" type="button" @click="onLogout">
          {{ $t('dashboard.logout') }}
        </button>
      </div>
    </header>

    <section class="dashboard-grid" v-if="householdsStore.currentId">
      <div class="dashboard-card">
        <div class="dashboard-card-title">{{ $t('dashboard.monthly') }}</div>
        <div class="dashboard-card-meta">{{ $t('dashboard.monthLabel') }} {{ month }}</div>
        <div class="dashboard-card-row">
          <div>
            <div class="dashboard-card-label">{{ $t('dashboard.income') }}</div>
            <div class="dashboard-card-value">{{ report?.totals?.income ?? 0 }}</div>
          </div>
          <div>
            <div class="dashboard-card-label">{{ $t('dashboard.expense') }}</div>
            <div class="dashboard-card-value">{{ report?.totals?.expense ?? 0 }}</div>
          </div>
          <div>
            <div class="dashboard-card-label">{{ $t('dashboard.net') }}</div>
            <div class="dashboard-card-value">{{ report?.totals?.net ?? 0 }}</div>
          </div>
        </div>
      </div>
    </section>

    <div v-else class="dashboard-empty">
      {{ $t('dashboard.selectHousehold') }}
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '../composables/apiClient';
import { t } from '../i18n';
import { useHouseholdsStore } from '../stores/households';

const $t = t;
const router = useRouter();
const householdsStore = useHouseholdsStore();
const report = ref(null);
const month = ref(new Date().toISOString().slice(0, 7));

const onLogout = async () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_household_id');
  }
  await router.push('/login');
};

const loadReport = async () => {
  if (!householdsStore.currentId) return;
  try {
    report.value = await apiRequest(
      `/households/${householdsStore.currentId}/reports/monthly?month=${encodeURIComponent(month.value)}`,
      { method: 'GET' }
    );
  } catch {
    report.value = null;
  }
};

watch(
  () => householdsStore.currentId,
  () => loadReport()
);

onMounted(() => {
  householdsStore.load();
  loadReport();
});
</script>
