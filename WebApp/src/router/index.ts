import { createRouter, createWebHistory } from 'vue-router'
// import { requireAuth } from './guards'

import Login from '@/views/login/Login.vue'
import GuestLogin from '@/views/login/GuestLogin.vue'
import Register from '@/views/login/Register.vue'
import Profile from '@/views/settings/Profile.vue'
import Games from '@/views/game/Games.vue'
import GameDetails from '@/views/game/GameDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login/guest',
      name: 'login-guest',
      component: GuestLogin
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/games',
      name: 'games',
      component: Games
    },
    {
      path: '/games/:id',
      name: 'game-details',
      component: GameDetails,
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
export default router