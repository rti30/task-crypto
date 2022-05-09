import { createRouter, createWebHistory } from 'vue-router';
const Main = () => import('@/views/AppMain.vue');
const Portfolio = () => import('@/views/AppPortfolio.vue');
const Error = () => import('@/views/AppError.vue');

let routes = [
   {
      name: 'main',
      path: '/',
      component: Main,
      meta: { auth: true },
   },
   {
      name: 'portfolio',
      path: '/portfolio',
      component: Portfolio,
      meta: { auth: false },
   },
   {
      name: 'E404',
      path: '/:pathMatch(.*)',
      component: Error,
   },
]

const router = createRouter({
   history: createWebHistory("demo-task-crypto"),
   routes,
   scrollBehavior() {
      document.getElementById('app').scrollIntoView();
   }
});

export default router;


