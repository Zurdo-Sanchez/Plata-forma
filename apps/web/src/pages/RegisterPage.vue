<template>
  <q-page class="auth-shell">
    <header class="auth-topbar">
      <div class="auth-brand">
        <div class="brand-mark">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z"
              fill="currentColor"
              opacity="0.2"
            />
            <path d="M12 6v12M6 12h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
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
          <h1>{{ $t('auth.register.title') }}</h1>
          <p>{{ $t('auth.register.subtitle') }}</p>
        </div>

        <form class="auth-form" @submit.prevent="onSubmit">
          <div class="auth-field">
            <label class="auth-label" for="register-name">{{ $t('auth.common.fullName') }}</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c2.5-4 13.5-4 16 0" />
                </svg>
              </span>
              <input
                id="register-name"
                v-model="fullName"
                class="auth-input"
                type="text"
                :placeholder="$t('auth.common.fullNamePlaceholder')"
                autocomplete="name"
              />
            </div>
          </div>

          <div class="auth-field">
            <label class="auth-label" for="register-email">{{ $t('auth.common.email') }}</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <input
                id="register-email"
                v-model="email"
                class="auth-input"
                type="email"
                :placeholder="$t('auth.common.emailPlaceholder')"
                autocomplete="email"
              />
            </div>
          </div>

          <div class="auth-field">
            <label class="auth-label" for="register-password">{{ $t('auth.common.password') }}</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M7 10V8a5 5 0 0 1 10 0v2" />
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                </svg>
              </span>
              <input
                id="register-password"
                v-model="password"
                class="auth-input"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('auth.common.passwordPlaceholder')"
                autocomplete="new-password"
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

          <div class="auth-field">
            <label class="auth-label" for="register-confirm">{{ $t('auth.common.confirmPassword') }}</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M7 10V8a5 5 0 0 1 10 0v2" />
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M9 15l2 2 4-4" />
                </svg>
              </span>
              <input
                id="register-confirm"
                v-model="confirmPassword"
                class="auth-input"
                :type="showConfirm ? 'text' : 'password'"
                :placeholder="$t('auth.common.confirmPlaceholder')"
                autocomplete="new-password"
              />
              <button
                class="auth-input-action"
                type="button"
                @click="showConfirm = !showConfirm"
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
            {{ $t('auth.register.acceptTerms') }}
          </label>

          <button class="auth-button" type="submit" :disabled="isLoading">
            {{ $t('auth.register.submit') }}
            <span>{{ $t('auth.common.arrow') }}</span>
          </button>
        </form>

        <div class="auth-secondary-card">
          <div class="auth-row">
            <span class="auth-label">{{ $t('auth.register.haveAccount') }}</span>
            <router-link class="auth-link" to="/login">{{ $t('auth.register.signIn') }}</router-link>
          </div>
          <p>{{ $t('auth.register.accountNote') }}</p>
        </div>
      </section>
    </main>

    <footer class="auth-footer">
      <router-link class="auth-link" to="/">{{ $t('auth.common.privacyPolicy') }}</router-link>
      <router-link class="auth-link" to="/">{{ $t('auth.common.termsOfService') }}</router-link>
      <router-link class="auth-link" to="/">{{ $t('auth.common.helpCenter') }}</router-link>
    </footer>

    <div class="auth-bottom">
      <span>{{ $t('auth.register.smartAccess') }}</span>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { t } from '../i18n';
import { useAuth } from '../composables/useAuth';
import LanguageMenu from '../components/LanguageMenu.vue';

const showPassword = ref(false);
const showConfirm = ref(false);
const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const $t = t;
const router = useRouter();
const { register } = useAuth();

const onSubmit = async () => {
  if (isLoading.value) return;
  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    Notify.create({ type: 'negative', message: t('auth.errors.required') });
    return;
  }

  if (password.value !== confirmPassword.value) {
    Notify.create({ type: 'negative', message: t('auth.errors.passwordMismatch') });
    return;
  }

  isLoading.value = true;
  try {
    await register({ email: email.value, password: password.value });
    Notify.create({ type: 'positive', message: t('auth.register.success') });
    await router.push('/login');
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('auth.errors.generic') });
  } finally {
    isLoading.value = false;
  }
};
</script>
