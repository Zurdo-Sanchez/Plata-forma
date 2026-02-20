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
        <LanguageMenu />
      </div>
    </header>

    <main class="auth-main">
      <section class="auth-card">
        <div>
          <h1>{{ $t('auth.login.title') }}</h1>
          <p>{{ $t('auth.login.subtitle') }}</p>
        </div>

        <form class="auth-form" @submit.prevent="onSubmit">
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
                v-model="email"
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
                v-model="password"
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

          <button class="auth-button" type="submit" :disabled="isLoading">
            {{ $t('auth.login.submit') }}
            <span>{{ $t('auth.common.arrow') }}</span>
          </button>
        </form>

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
      <span>{{ $t('auth.login.copyright') }}</span>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { t, locale } from '../i18n';
import { safeStorage } from '../utils/storage';
import { useAuth } from '../composables/useAuth';
import LanguageMenu from '../components/LanguageMenu.vue';

const showPassword = ref(false);
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const $t = t;
const router = useRouter();
const { login } = useAuth();

const formatLockedUntil = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
};

const resolveLoginErrorMessage = (error) => {
  if (!error) return t('auth.errors.generic');

  const payload = error.payload;
  const formattedLockedUntil = formatLockedUntil(payload?.lockedUntil);
  if (formattedLockedUntil) {
    return t('auth.errors.lockedUntil', { date: formattedLockedUntil });
  }

  if (error.status === 429) {
    return t('auth.errors.locked');
  }

  const payloadMessage = payload?.message;
  if (Array.isArray(payloadMessage)) {
    const cleaned = payloadMessage.filter((item) => typeof item === 'string' && item.trim().length);
    if (cleaned.length) return cleaned.join(' ');
  }

  if (typeof payloadMessage === 'string' && payloadMessage.trim()) return payloadMessage;
  if (typeof error.message === 'string' && error.message.trim()) return error.message;
  if (error.status === 401) return t('auth.errors.invalidCredentials');
  if (error.status === 400) return t('auth.errors.invalidBody');

  return t('auth.errors.generic');
};


const onSubmit = async () => {
  if (isLoading.value) return;
  if (!email.value || !password.value) {
    Notify.create({ type: 'negative', message: t('auth.errors.required') });
    return;
  }

  isLoading.value = true;
  try {
    const response = await login({ email: email.value, password: password.value });
    if (response?.accessToken) {
      safeStorage.set('auth_token', response.accessToken);
    }
    Notify.create({ type: 'positive', message: response?.message || t('auth.login.success') });
    await router.push('/dashboard');
  } catch (error) {
    Notify.create({ type: 'negative', message: resolveLoginErrorMessage(error) });
  } finally {
    isLoading.value = false;
  }
};

</script>
