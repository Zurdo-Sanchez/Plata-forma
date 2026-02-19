<template>
  <q-page class="app-page">
    <section class="page-card">
      <header class="page-header">
        <div>
          <div class="page-kicker">{{ $t('reports.kicker') }}</div>
          <h1>{{ $t('reports.title') }}</h1>
          <p>{{ $t('reports.subtitle') }}</p>
        </div>
      </header>

      <div v-if="!householdsStore.currentId" class="page-empty">
        {{ $t('reports.selectHousehold') }}
      </div>

      <div v-else class="page-grid">
        <div class="page-panel">
          <div class="panel-title">{{ $t('reports.filters') }}</div>
          <form class="panel-form" @submit.prevent="onLoad">
            <label class="panel-label" for="report-month">{{ $t('reports.month') }}</label>
            <input id="report-month" v-model="month" class="panel-input" type="month" />
            <button class="panel-button" type="submit" :disabled="isLoading">
              {{ $t('reports.load') }}
            </button>
          </form>
        </div>

        <div class="page-panel" v-if="report">
          <div class="panel-title">{{ $t('reports.summary') }}</div>
          <div class="panel-summary">
            <div>
              <div class="panel-item-meta">{{ $t('reports.income') }}</div>
              <div class="panel-item-title">{{ report.totals.income }}</div>
            </div>
            <div>
              <div class="panel-item-meta">{{ $t('reports.expense') }}</div>
              <div class="panel-item-title">{{ report.totals.expense }}</div>
            </div>
            <div>
              <div class="panel-item-meta">{{ $t('reports.net') }}</div>
              <div class="panel-item-title">{{ report.totals.net }}</div>
            </div>
          </div>
        </div>

        <div class="page-panel" v-if="report">
          <div class="panel-title">{{ $t('reports.byCategory') }}</div>
          <div class="panel-list">
            <div v-for="item in report.byCategory" :key="item.categoryId || item.name" class="panel-item">
              <div>
                <div class="panel-item-title">{{ item.name }}</div>
                <div class="panel-item-meta">{{ item.type || '-' }}</div>
              </div>
              <div class="panel-item-title">{{ item.amount }}</div>
            </div>
          </div>
        </div>

        <div class="page-panel" v-if="report">
          <div class="panel-title">{{ $t('reports.byAccount') }}</div>
          <div class="panel-list">
            <div v-for="item in report.byAccount" :key="item.accountId" class="panel-item">
              <div>
                <div class="panel-item-title">{{ item.name }}</div>
                <div class="panel-item-meta">{{ item.type || '-' }}</div>
              </div>
              <div class="panel-item-title">{{ item.amount }}</div>
            </div>
          </div>
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

const $t = t;
const householdsStore = useHouseholdsStore();
const report = ref(null);
const month = ref(new Date().toISOString().slice(0, 7));
const isLoading = ref(false);

const onLoad = async () => {
  if (!householdsStore.currentId || !month.value) return;
  isLoading.value = true;
  try {
    const data = await apiRequest(
      `/households/${householdsStore.currentId}/reports/monthly?month=${encodeURIComponent(month.value)}`,
      { method: 'GET' }
    );
    report.value = data;
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => householdsStore.currentId,
  () => {
    report.value = null;
    onLoad();
  }
);

onMounted(() => {
  householdsStore.load();
  onLoad();
});
</script>
