import Vue from 'vue'
import VueRouter from 'vue-router'
const LoginIndex = () => import('../views/login/index')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/Layout.vue')
  },
  {
    path: '/login',
    component: LoginIndex
  }
]

const router = new VueRouter({
  routes
})

export default router
