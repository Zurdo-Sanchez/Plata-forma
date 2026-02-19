<template>
  <div ref="localeMenuRef" class="auth-locale" @click.stop>
    <span class="auth-locale-label">{{ $t('auth.common.language') }}</span>
    <button class="auth-locale-trigger" type="button" @click="toggleLocaleMenu">
      {{ currentLocaleLabel }}
      <span class="auth-locale-caret" aria-hidden="true"></span>
    </button>
    <div v-if="isLocaleOpen" class="auth-locale-menu" @click.stop>
      <button class="auth-locale-item" type="button" :class="{ active: currentLocale === 'es' }" @click="selectLocale('es')">
        {{ $t('auth.common.languageEs') }}
      </button>
      <button class="auth-locale-item" type="button" :class="{ active: currentLocale === 'en' }" @click="selectLocale('en')">
        {{ $t('auth.common.languageEn') }}
      </button>
      <button class="auth-locale-item" type="button" :class="{ active: currentLocale === 'ca' }" @click="selectLocale('ca')">
        {{ $t('auth.common.languageCa') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { t, locale, setLocale } from '../i18n';

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
