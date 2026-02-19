<template>
  <q-layout view="hHh lpR fFf">
    <div v-if="showAppNav" class="app-shell">
      <aside class="app-sidebar">
        <div class="app-brand">
          <span class="app-brand-mark">PF</span>
          <div>
            <div class="app-brand-title">{{ $t('app.brand') }}</div>
            <div class="app-brand-sub">{{ $t('app.tagline') }}</div>
          </div>
        </div>

        <nav class="app-nav">
          <router-link class="app-nav-item" to="/dashboard">{{ $t('nav.dashboard') }}</router-link>
          <router-link class="app-nav-item" to="/households">{{ $t('nav.households') }}</router-link>
          <router-link class="app-nav-item" to="/accounts">{{ $t('nav.accounts') }}</router-link>
          <router-link class="app-nav-item" to="/categories">{{ $t('nav.categories') }}</router-link>
          <router-link class="app-nav-item" to="/transactions">{{ $t('nav.transactions') }}</router-link>
          <router-link class="app-nav-item" to="/credit-cards">{{ $t('nav.creditCards') }}</router-link>
          <router-link class="app-nav-item" to="/loans">{{ $t('nav.loans') }}</router-link>
          <router-link class="app-nav-item" to="/reports">{{ $t('nav.reports') }}</router-link>
        </nav>

        <div class="app-sidebar-footer">
          <LanguageMenu />
        </div>
      </aside>
      <main class="app-content">
        <router-view />
      </main>
    </div>
    <q-page-container v-else>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { t } from '../i18n';
import LanguageMenu from '../components/LanguageMenu.vue';
import { useHouseholdsStore } from '../stores/households';

const $t = t;
const route = useRoute();
const householdsStore = useHouseholdsStore();

const showAppNav = computed(() => route.matched.some((record) => record.meta?.requiresAuth));

onMounted(() => {
  if (showAppNav.value) {
    householdsStore.load();
  }
});
</script>
