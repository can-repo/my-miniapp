// src/navigation/routes.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import GridPage from '../pages/GridPage.vue';
import FormPage from '../pages/FormPage.vue';
import ChartPage from '../pages/ChartPage.vue';

export const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage },
  { path: '/grid', component: GridPage },
  { path: '/form', component: FormPage },
  { path: '/chart', component: ChartPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
