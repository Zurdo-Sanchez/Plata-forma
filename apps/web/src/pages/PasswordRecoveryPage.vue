<template>
  <q-page class="auth-shell">
    <header class="auth-topbar">
      <div class="auth-brand">
        <div class="brand-mark">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" opacity="0.15" />
            <path
              d="M8 12a4 4 0 1 0 4-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path d="M12 8v4h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
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
        <button class="auth-icon-btn" type="button" :aria-label="$t('auth.common.help')">
          {{ $t('auth.common.helpSymbol') }}
        </button>
      </div>
    </header>

    <main class="auth-main">
      <section class="auth-card">
        <div>
          <h1>{{ $t('auth.recovery.title') }}</h1>
          <p>{{ $t('auth.recovery.subtitle') }}</p>
        </div>

        <div class="auth-field">
          <label class="auth-label" for="recovery-email">{{ $t('auth.common.email') }}</label>
          <div class="auth-input-wrap">
            <span class="auth-input-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </span>
            <input
              id="recovery-email"
              class="auth-input"
              type="email"
              :placeholder="$t('auth.common.emailPlaceholder')"
              autocomplete="email"
            />
          </div>
        </div>

        <button class="auth-button" type="button">
          {{ $t('auth.recovery.submit') }}
          <span>{{ $t('auth.common.arrow') }}</span>
        </button>

        <div class="auth-pill-list">
          <span class="auth-pill">{{ $t('auth.recovery.ssl') }}</span>
          <span class="auth-pill">{{ $t('auth.recovery.pci') }}</span>
        </div>
      </section>
    </main>

    <div class="auth-footer-note">
      <router-link class="auth-link" to="/login">{{ $t('auth.common.backToLogin') }}</router-link>
    </div>

    <footer class="auth-footer">
      <span>{{ $t('auth.recovery.copyright') }}</span>
      <router-link class="auth-link" to="/">{{ $t('auth.common.privacyPolicy') }}</router-link>
    </footer>
  </q-page>
</template>

<script setup>
import { t } from '../i18n';

const $t = t;
</script>
