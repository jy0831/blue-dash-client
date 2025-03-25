import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import DashBoard from "../pages/DashBoard.vue";
import Test from "../pages/Test.vue";
import LodingPage from '../pages/LodingPage.vue'

const routes = [
  
  {
    path: '/',
    redirect: {
      path: '/dashboard'
    }
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard,
    meta: {
      useLayout: true
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {
      useLayout: true
    }
  },
  {
    path: '/lodingpage',
    name: 'LodingPage',
    component: LodingPage,
    meta: {
      useLayout: false
    }
  },
  {
    path: '/*',
    redirect: {
      path: '/dashboard'
    }
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
