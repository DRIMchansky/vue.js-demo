import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../pages/Todo.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../pages/Posts.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
