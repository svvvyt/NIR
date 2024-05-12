import { createRouter, createWebHistory } from 'vue-router'

import { MainPage, UserListPage, UserListItemPage } from '@/pages'

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/users',
    component: UserListPage
  },
  {
    path: '/users/:id',
    component: UserListItemPage
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export default router
