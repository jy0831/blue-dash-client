import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import DashBoard from "../pages/DashBoard.vue";
import Test from "../pages/Test.vue";

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
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  
  next();
});
export default router
