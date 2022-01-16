import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // kakao callback
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  // kakao callback
  {
    path: '/auth/kakao/callback',
    name: 'AuthKakaoCallback',
    component: () => import('../views/AuthKakaoCallback.vue')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
