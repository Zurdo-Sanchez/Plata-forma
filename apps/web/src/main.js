import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';
import quasarUserOptions from './quasar-user-options';
import App from './App.vue';
import router from './router';
import { installI18n } from './i18n';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Quasar, quasarUserOptions);
installI18n(app);

app.mount('#q-app');
