import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: import('../pages/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(`${__ENV.VITE_APP_URL}:${__ENV.VITE_APP_PORT}`),
  routes
})

router.beforeEach((to, from, next) => {
  
  next();
});
export default router
