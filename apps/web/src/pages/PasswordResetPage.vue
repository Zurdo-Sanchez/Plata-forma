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
            <path d="M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M12 8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>
        <span>{{ $t('app.brand') }}</span>
      </div>
      <div class="auth-meta">
        <span class="auth-chip">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          {{ $t('auth.common.secureStatus') }}
        </span>
        <button class="auth-icon-btn" type="button" :aria-label="$t('auth.common.help')">
          {{ $t('auth.common.helpSymbol') }}
        </button>
      </div>
    </header>

    <main class="auth-main">
      <section class="auth-card">
        <div>
          <h1>{{ $t('auth.reset.title') }}</h1>
          <p>{{ $t('auth.reset.subtitle') }}</p>
        </div>

        <form class="auth-form" @submit.prevent="onSubmit">
          <div class="auth-field">
            <label class="auth-label" for="reset-password">{{ $t('auth.common.newPassword') }}</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M7 10V8a5 5 0 0 1 10 0v2" />
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                </svg>
              </span>
              <input
                id="reset-password"
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

        <div class="auth-strength">
          <div class="auth-row">
            <span class="auth-label">{{ $t('auth.reset.strengthTitle') }}</span>
            <span>{{ $t('auth.reset.strengthPercent') }}</span>
          </div>
          <div class="auth-strength-bar"><span /></div>
          <div class="auth-strength-list">
            <div class="auth-strength-item">{{ $t('auth.reset.strengthLength') }}</div>
            <div class="auth-strength-item">{{ $t('auth.reset.strengthCase') }}</div>
            <div class="auth-strength-item">{{ $t('auth.reset.strengthSymbols') }}</div>
          </div>
        </div>

          <div class="auth-field">
            <label class="auth-label" for="reset-confirm">{{ $t('auth.common.confirmPassword') }}</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M7 10V8a5 5 0 0 1 10 0v2" />
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M9 15l2 2 4-4" />
                </svg>
              </span>
              <input
                id="reset-confirm"
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

          <button class="auth-button" type="submit" :disabled="isLoading">
            {{ $t('auth.reset.submit') }}
            <span>{{ $t('auth.common.arrow') }}</span>
          </button>

          <div class="auth-footer-note">
            <router-link class="auth-link" to="/login">{{ $t('auth.common.backToLogin') }}</router-link>
          </div>
        </form>
      </section>
    </main>

    <div class="auth-info">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
      </svg>
      {{ $t('auth.reset.info') }}
    </div>

    <footer class="auth-footer">
      <router-link class="auth-link" to="/">{{ $t('auth.common.privacyPolicy') }}</router-link>
      <router-link class="auth-link" to="/">{{ $t('auth.common.termsOfService') }}</router-link>
    </footer>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { t } from '../i18n';
import { useAuth } from '../composables/useAuth';

const showPassword = ref(false);
const showConfirm = ref(false);
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const $t = t;
const router = useRouter();
const { resetPassword } = useAuth();

const onSubmit = async () => {
  if (isLoading.value) return;
  if (!password.value || !confirmPassword.value) {
    Notify.create({ type: 'negative', message: t('auth.errors.required') });
    return;
  }

  if (password.value !== confirmPassword.value) {
    Notify.create({ type: 'negative', message: t('auth.errors.passwordMismatch') });
    return;
  }

  isLoading.value = true;
  try {
    await resetPassword({ password: password.value });
    Notify.create({ type: 'positive', message: t('auth.reset.success') });
    await router.push('/login');
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('auth.errors.generic') });
  } finally {
    isLoading.value = false;
  }
};
</script>
