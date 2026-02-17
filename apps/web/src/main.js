import { createApp } from 'vue';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import App from './App.vue';
import router from './router';
import { installI18n } from './i18n';

const app = createApp(App);

app.use(router);
app.use(Quasar, quasarUserOptions);
installI18n(app);

app.mount('#q-app');
