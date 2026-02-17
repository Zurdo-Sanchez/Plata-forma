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
        <span class="auth-chip">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
            <path d="M9.5 12.5l2 2 3.5-4" />
          </svg>
          {{ $t('auth.common.secureConnection') }}
        </span>
      </div>
    </header>

    <main class="auth-main">
      <section class="auth-card">
        <div>
          <h1>{{ $t('auth.register.title') }}</h1>
          <p>{{ $t('auth.register.subtitle') }}</p>
        </div>

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

        <button class="auth-button" type="button">
          {{ $t('auth.register.submit') }}
          <span>{{ $t('auth.common.arrow') }}</span>
        </button>

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
      <div class="auth-pill-list">
        <span class="auth-pill">{{ $t('auth.register.biometrics') }}</span>
        <span class="auth-pill">{{ $t('auth.register.secureTokens') }}</span>
      </div>
      <span>{{ $t('auth.register.smartAccess') }}</span>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { t } from '../i18n';

const showPassword = ref(false);
const showConfirm = ref(false);
const $t = t;
</script>
