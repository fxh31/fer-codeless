import { createRouter, createWebHistory } from 'vue-router';

let VITE_PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH;

const router = createRouter({
  history: createWebHistory(VITE_PUBLIC_PATH),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: 'form-designer',
          name: 'FormDesigner',
          component: () => import('@/views/FormDesigner.vue'),
        },
        {
          path: 'external-link',
          name: 'ExternalLink',
          component: () => import('@/views/ExternalLinkView.vue'),
        },
      ],
    },
  ],
});

export default router;
