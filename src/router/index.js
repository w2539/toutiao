import Vue from 'vue'
import VueRouter from 'vue-router'

// vue3可以使用这种方法
// const HelloWorld = () => import('@/components/HelloWord.vue')
import HelloWorld from '@/components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }
]

const router = new VueRouter({
  routes
})

export default router
