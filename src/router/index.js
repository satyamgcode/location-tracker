import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path : '/',
    name : 'locater',
    component : () => import('../components/UploadImage.vue'),
  },
  {
    path: '/view/:imageUrl',
    name : 'viewImage',
    component : () => import('../components/ViewImage.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
