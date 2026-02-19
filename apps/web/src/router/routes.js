import MainLayout from 'layouts/MainLayout.vue';
import LoginPage from 'pages/LoginPage.vue';
import RegisterPage from 'pages/RegisterPage.vue';
import PasswordRecoveryPage from 'pages/PasswordRecoveryPage.vue';
import PasswordResetPage from 'pages/PasswordResetPage.vue';
import DashboardPage from 'pages/DashboardPage.vue';
import HouseholdsPage from 'pages/HouseholdsPage.vue';
import AccountsPage from 'pages/AccountsPage.vue';
import CategoriesPage from 'pages/CategoriesPage.vue';
import TransactionsPage from 'pages/TransactionsPage.vue';
import CreditCardsPage from 'pages/CreditCardsPage.vue';
import LoansPage from 'pages/LoansPage.vue';
import ReportsPage from 'pages/ReportsPage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: LoginPage, meta: { guestOnly: true } },
      { path: 'login', component: LoginPage, meta: { guestOnly: true } },
      { path: 'registro', component: RegisterPage, meta: { guestOnly: true } },
      { path: 'recuperar', component: PasswordRecoveryPage, meta: { guestOnly: true } },
      { path: 'restablecer', component: PasswordResetPage, meta: { guestOnly: true } },
      { path: 'dashboard', component: DashboardPage, meta: { requiresAuth: true } },
      { path: 'households', component: HouseholdsPage, meta: { requiresAuth: true } },
      { path: 'accounts', component: AccountsPage, meta: { requiresAuth: true } },
      { path: 'categories', component: CategoriesPage, meta: { requiresAuth: true } },
      { path: 'transactions', component: TransactionsPage, meta: { requiresAuth: true } },
      { path: 'credit-cards', component: CreditCardsPage, meta: { requiresAuth: true } },
      { path: 'loans', component: LoansPage, meta: { requiresAuth: true } },
      { path: 'reports', component: ReportsPage, meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
