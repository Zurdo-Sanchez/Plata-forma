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
        <LanguageMenu />
      </div>
    </header>

    <main class="auth-main">
      <section class="auth-card">
        <div>
          <h1>{{ $t('auth.recovery.title') }}</h1>
          <p>{{ $t('auth.recovery.subtitle') }}</p>
        </div>

        <form class="auth-form" @submit.prevent="onSubmit">
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
                v-model="email"
                class="auth-input"
                type="email"
                :placeholder="$t('auth.common.emailPlaceholder')"
                autocomplete="email"
              />
            </div>
          </div>

          <button class="auth-button" type="submit" :disabled="isLoading">
            {{ $t('auth.recovery.submit') }}
            <span>{{ $t('auth.common.arrow') }}</span>
          </button>
        </form>

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
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { t } from '../i18n';
import { useAuth } from '../composables/useAuth';
import LanguageMenu from '../components/LanguageMenu.vue';

const $t = t;
const email = ref('');
const isLoading = ref(false);
const { requestRecovery } = useAuth();
const router = useRouter();

const onSubmit = async () => {
  if (isLoading.value) return;
  if (!email.value) {
    Notify.create({ type: 'negative', message: t('auth.errors.required') });
    return;
  }

  isLoading.value = true;
  try {
    await requestRecovery({ email: email.value });
    Notify.create({ type: 'positive', message: t('auth.recovery.success') });
    await router.push('/restablecer');
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('auth.errors.generic') });
  } finally {
    isLoading.value = false;
  }
};
</script>
