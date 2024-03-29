import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import Posts from '../pages/Posts.vue'
import Post from '../pages/Post.vue'
import Home from '../pages/Home.vue'
import Todo from '../pages/Todo.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/todo',
    name: 'todo',
    component: Todo
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: Post
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
