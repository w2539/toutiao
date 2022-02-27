import Vue from 'vue'
import VueRouter from 'vue-router'
const LoginIndex = () => import('../views/login/index')
const my = () => import('@/views/my/my.vue')
const search = () => import('@/views/search/search.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/qa.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/video.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: my
      }
    ]
  },
  {
    path: '/login',
    component: LoginIndex
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }
]

const router = new VueRouter({
  routes
})

export default router
