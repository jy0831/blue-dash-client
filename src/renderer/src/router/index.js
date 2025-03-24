import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from "../pages/DashBoard.vue";

const routes = [
  {
    path: '/index.html',
    redirect: {
      path: '/dashboard'
    }
  },
  {
    path: '/',
    redirect: {
      path: '/dashboard'
    }
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
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
