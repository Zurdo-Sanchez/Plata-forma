<template>
  <q-page class="app-page">
    <section class="page-card">
      <header class="page-header">
        <div>
          <div class="page-kicker">{{ $t('categories.kicker') }}</div>
          <h1>{{ $t('categories.title') }}</h1>
          <p>{{ $t('categories.subtitle') }}</p>
        </div>
      </header>

      <div v-if="!householdsStore.currentId" class="page-empty">
        {{ $t('categories.selectHousehold') }}
      </div>

      <div v-else class="page-grid">
        <div class="page-panel">
          <div class="panel-title">{{ $t('categories.listTitle') }}</div>
          <div v-if="!items.length" class="panel-empty">{{ $t('categories.empty') }}</div>
          <div v-else class="panel-list">
            <div v-for="category in items" :key="category.id" class="panel-item">
              <div v-if="editingId === category.id" class="panel-edit">
                <label class="panel-label" :for="`category-name-${category.id}`">{{ $t('categories.name') }}</label>
                <input :id="`category-name-${category.id}`" v-model="editName" class="panel-input" type="text" />

                <div class="panel-actions">
                  <button class="panel-action" type="button" @click="saveEdit">
                    {{ $t('categories.save') }}
                  </button>
                  <button class="panel-action" type="button" @click="cancelEdit">
                    {{ $t('categories.cancel') }}
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="panel-item-title">{{ category.name }}</div>
              </div>
              <div class="panel-actions" v-if="editingId !== category.id">
                <button class="panel-action" type="button" @click="startEdit(category)">
                  {{ $t('categories.edit') }}
                </button>
                <button class="panel-action" type="button" @click="archiveCategory(category.id)">
                  {{ $t('categories.archive') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="page-panel">
          <div class="panel-title">{{ $t('categories.createTitle') }}</div>
          <form class="panel-form" @submit.prevent="onCreate">
            <label class="panel-label" for="category-name">{{ $t('categories.name') }}</label>
            <input id="category-name" v-model="name" class="panel-input" type="text" />

            <button class="panel-button" type="submit" :disabled="isSaving">
              {{ $t('categories.createAction') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { Notify } from 'quasar';
import { t } from '../i18n';
import { apiRequest } from '../composables/apiClient';
import { useHouseholdsStore } from '../stores/households';
import pinia from '../stores/pinia';

const $t = t;
const householdsStore = useHouseholdsStore(pinia);
const items = ref([]);
const name = ref('');
const isSaving = ref(false);
const editingId = ref('');
const editName = ref('');

const loadCategories = async () => {
  if (!householdsStore.currentId) return;
  try {
    const data = await apiRequest(`/households/${householdsStore.currentId}/categories`, { method: 'GET' });
    items.value = Array.isArray(data) ? data : [];
  } catch {
    items.value = [];
  }
};

const startEdit = (category) => {
  editingId.value = category.id;
  editName.value = category.name || '';
};

const cancelEdit = () => {
  editingId.value = '';
  editName.value = '';
};

const saveEdit = async () => {
  if (!editingId.value || !householdsStore.currentId) return;
  if (!editName.value.trim()) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  try {
    const response = await apiRequest(`/categories/${editingId.value}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: editName.value.trim()
      })
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    cancelEdit();
    await loadCategories();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  }
};

const onCreate = async () => {
  if (isSaving.value || !householdsStore.currentId) return;
  if (!name.value.trim()) {
    Notify.create({ type: 'negative', message: t('app.errors.required') });
    return;
  }
  isSaving.value = true;
  try {
    const response = await apiRequest(`/households/${householdsStore.currentId}/categories`, {
      method: 'POST',
      body: JSON.stringify({
        name: name.value.trim()
      })
    });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    name.value = '';
    await loadCategories();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  } finally {
    isSaving.value = false;
  }
};

const archiveCategory = async (id) => {
  if (!householdsStore.currentId) return;
  try {
    const response = await apiRequest(`/categories/${id}`, { method: 'DELETE' });
    Notify.create({ type: 'positive', message: response?.message || t('app.messages.saved') });
    await loadCategories();
  } catch (error) {
    Notify.create({ type: 'negative', message: error?.message || t('app.errors.generic') });
  }
};

watch(
  () => householdsStore.currentId,
  () => {
    loadCategories();
  }
);

onMounted(() => {
  householdsStore.load();
  loadCategories();
});
</script>
