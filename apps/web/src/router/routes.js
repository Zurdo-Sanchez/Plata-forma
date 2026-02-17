import MainLayout from 'layouts/MainLayout.vue';
import LoginPage from 'pages/LoginPage.vue';
import RegisterPage from 'pages/RegisterPage.vue';
import PasswordRecoveryPage from 'pages/PasswordRecoveryPage.vue';
import PasswordResetPage from 'pages/PasswordResetPage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: LoginPage },
      { path: 'login', component: LoginPage },
      { path: 'registro', component: RegisterPage },
      { path: 'recuperar', component: PasswordRecoveryPage },
      { path: 'restablecer', component: PasswordResetPage }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
