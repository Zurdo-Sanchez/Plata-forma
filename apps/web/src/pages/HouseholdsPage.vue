<template>
  <q-page class="app-page">
    <section class="page-card">
      <header class="page-header">
        <div>
          <div class="page-kicker">{{ $t('households.kicker') }}</div>
          <h1>{{ $t('households.title') }}</h1>
          <p>{{ $t('households.subtitle') }}</p>
        </div>
      </header>

      <div class="page-grid">
        <div class="page-panel">
          <div class="panel-title">{{ $t('households.listTitle') }}</div>
          <div v-if="!householdsStore.items.length" class="panel-empty">
            {{ $t('households.empty') }}
          </div>
          <div v-else class="panel-list">
            <div v-for="household in householdsStore.items" :key="household.id" class="panel-item">
              <div>
                <div class="panel-item-title">{{ household.name }}</div>
                <div class="panel-item-meta">
                  {{ household.currency || $t('households.currencyFallback') }}
                </div>
              </div>
              <button class="panel-action" type="button" @click="selectHousehold(household.id)">
                {{ household.id === householdsStore.currentId ? $t('households.selected') : $t('households.select') }}
              </button>
            </div>
          </div>
        </div>

        <div class="page-panel">
          <div class="panel-title">{{ $t('households.createTitle') }}</div>
          <form class="panel-form" @submit.prevent="onCreate">
            <label class="panel-label" for="household-name">{{ $t('households.name') }}</label>
            <input id="household-name" v-model="name" class="panel-input" type="text" />

            <label class="panel-label" for="household-currency">{{ $t('households.currency') }}</label>
            <input id="household-currency" v-model="currency" class="panel-input" type="text" maxlength="3" />

            <button class="panel-button" type="submit" :disabled="isCreating">
              {{ $t('households.createAction') }}
            </button>
          </form>
        </div>

        <div class="page-panel" v-if="householdsStore.currentId">
          <div class="panel-title">{{ $t('households.addMemberTitle') }}</div>
          <form class="panel-form" @submit.prevent="onAddMember">
            <label class="panel-label" for="member-email">{{ $t('households.memberEmail') }}</label>
            <input id="member-email" v-model="memberEmail" class="panel-input" type="email" />

            <label class="panel-label" for="member-role">{{ $t('households.memberRole') }}</label>
            <select id="member-role" v-model="memberRole" class="panel-input">
              <option value="MEMBER">{{ $t('households.memberRoleMember') }}</option>
              <option value="OWNER">{{ $t('households.memberRoleOwner') }}</option>
            </select>

            <button class="panel-button" type="submit" :disabled="isAdding">
              {{ $t('households.addMemberAction') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Notify } from 'quasar';
import { t } from '../i18n';
import { useHouseholdsStore } from '../stores/households';
import pinia from '../stores/pinia';

const $t = t;
const householdsStore = useHouseholdsStore(pinia);
const name = ref('');
const currency = ref('');
const memberEmail = ref('');
const memberRole = ref('MEMBER');
const isCreating = ref(false);
const isAdding = ref(false);

const selectHousehold = (id) => {
  householdsStore.select(id);
};

const onCreate = async () => {
  if (isCreating.value) return;
  if (!name.value.trim()) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  isCreating.value = true;
  try {
    const response = await householdsStore.create({
      name: name.value.trim(),
      currency: currency.value.trim() || undefined
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    name.value = '';
    currency.value = '';
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  } finally {
    isCreating.value = false;
  }
};

const onAddMember = async () => {
  if (isAdding.value || !householdsStore.currentId) return;
  if (!memberEmail.value.trim()) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  isAdding.value = true;
  try {
    const response = await householdsStore.addMember(householdsStore.currentId, {
      email: memberEmail.value.trim(),
      role: memberRole.value
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    memberEmail.value = '';
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  } finally {
    isAdding.value = false;
  }
};

onMounted(() => {
  householdsStore.load();
});
</script>
