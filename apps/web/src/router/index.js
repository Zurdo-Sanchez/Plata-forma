import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { safeStorage } from '../utils/storage';

const router = createRouter({
  history: createWebHistory(),
  routes
});

const hasAuthToken = () => {
  const token = safeStorage.get('auth_token');
  return Boolean(token && token.trim().length);
};

router.beforeEach((to) => {
  const authed = hasAuthToken();

  if (to.matched.some((record) => record.meta?.requiresAuth) && !authed) {
    return { path: '/login' };
  }

  if (to.matched.some((record) => record.meta?.guestOnly) && authed) {
    return { path: '/dashboard' };
  }

  return true;
});

export default router;
