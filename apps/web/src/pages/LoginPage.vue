<template>
  <q-page class="auth-shell">
    <header class="auth-topbar">
      <div class="auth-brand">
        <div class="brand-mark">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="5" width="6" height="14" rx="3" fill="currentColor" />
            <rect x="14" y="5" width="6" height="14" rx="3" fill="currentColor" />
          </svg>
        </div>
        <span>{{ $t('app.brand') }}</span>
      </div>
      <div class="auth-meta">
        <div ref="localeMenuRef" class="auth-locale" @click.stop>
          <span class="auth-locale-label">{{ $t('auth.common.language') }}</span>
          <button class="auth-locale-trigger" type="button" @click="toggleLocaleMenu">
            {{ currentLocaleLabel }}
            <span class="auth-locale-caret" aria-hidden="true"></span>
          </button>
          <div v-if="isLocaleOpen" class="auth-locale-menu" @click.stop>
            <button
              class="auth-locale-item"
              type="button"
              :class="{ active: currentLocale === 'es' }"
              @click="selectLocale('es')"
            >
              {{ $t('auth.common.languageEs') }}
            </button>
            <button
              class="auth-locale-item"
              type="button"
              :class="{ active: currentLocale === 'en' }"
              @click="selectLocale('en')"
            >
              {{ $t('auth.common.languageEn') }}
            </button>
            <button
              class="auth-locale-item"
              type="button"
              :class="{ active: currentLocale === 'ca' }"
              @click="selectLocale('ca')"
            >
              {{ $t('auth.common.languageCa') }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="auth-main">
      <section class="auth-card">
        <div>
          <h1>{{ $t('auth.login.title') }}</h1>
          <p>{{ $t('auth.login.subtitle') }}</p>
        </div>

        <div class="auth-field">
          <label class="auth-label" for="login-email">{{ $t('auth.common.email') }}</label>
          <div class="auth-input-wrap">
            <span class="auth-input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </span>
            <input
              id="login-email"
              class="auth-input"
              type="email"
              :placeholder="$t('auth.common.emailPlaceholder')"
              autocomplete="email"
            />
          </div>
        </div>

        <div class="auth-field">
          <div class="auth-row">
            <label class="auth-label" for="login-password">{{ $t('auth.common.password') }}</label>
            <router-link class="auth-link" to="/recuperar">{{ $t('auth.login.forgotPassword') }}</router-link>
          </div>
          <div class="auth-input-wrap">
            <span class="auth-input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M7 10V8a5 5 0 0 1 10 0v2" />
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <circle cx="12" cy="15" r="2" />
              </svg>
            </span>
            <input
              id="login-password"
              class="auth-input"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t('auth.common.passwordMask')"
              autocomplete="current-password"
            />
            <button
              class="auth-input-action"
              type="button"
              @click="showPassword = !showPassword"
              :aria-label="$t('auth.common.togglePassword')"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        <label class="auth-checkbox">
          <input type="checkbox" />
          {{ $t('auth.common.rememberMe') }}
        </label>

        <button class="auth-button" type="button">
          {{ $t('auth.login.submit') }}
          <span>{{ $t('auth.common.arrow') }}</span>
        </button>

        <div class="auth-divider">{{ $t('auth.login.householdAccess') }}</div>

        <div class="auth-secondary-card">
          <p>{{ $t('auth.login.householdPrompt') }}</p>
          <router-link class="auth-button secondary" to="/registro">
            {{ $t('auth.login.householdAction') }}
            <span>{{ $t('auth.common.arrow') }}</span>
          </router-link>
        </div>
      </section>
    </main>

    <footer class="auth-footer">
      <router-link class="auth-link" to="/">{{ $t('auth.common.privacyPolicy') }}</router-link>
      <router-link class="auth-link" to="/">{{ $t('auth.common.termsOfService') }}</router-link>
      <router-link class="auth-link" to="/">{{ $t('auth.common.helpCenter') }}</router-link>
    </footer>

    <div class="auth-bottom">
      <div class="auth-pill-list">
        <span class="auth-pill">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
            <path d="M9.5 12.5l2 2 3.5-4" />
          </svg>
          {{ $t('auth.login.pci') }}
        </span>
        <span class="auth-pill">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M5 8h14" />
            <path d="M7 12h10" />
            <path d="M9 16h6" />
            <rect x="4" y="4" width="16" height="16" rx="3" />
          </svg>
          {{ $t('auth.login.aes') }}
        </span>
      </div>
      <span>{{ $t('auth.login.copyright') }}</span>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { t, locale, setLocale } from '../i18n';

const showPassword = ref(false);
const $t = t;
const isLocaleOpen = ref(false);
const localeMenuRef = ref(null);

const currentLocale = computed(() => locale.value);
const currentLocaleLabel = computed(() => {
  if (locale.value === 'en') return t('auth.common.languageEn');
  if (locale.value === 'ca') return t('auth.common.languageCa');
  return t('auth.common.languageEs');
});

const selectLocale = (value) => {
  setLocale(value);
  isLocaleOpen.value = false;
};

const toggleLocaleMenu = () => {
  isLocaleOpen.value = !isLocaleOpen.value;
};

const handleClickOutside = (event) => {
  if (!localeMenuRef.value) return;
  if (!localeMenuRef.value.contains(event.target)) {
    isLocaleOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>
