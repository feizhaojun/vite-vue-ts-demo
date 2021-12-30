import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/home/index.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/test',
    component: () => import('../pages/home/index.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;