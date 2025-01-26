import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth } from './guards'

import Login from '@/views/login/Login.vue'
import GuestLogin from '@/views/login/GuestLogin.vue'
import Register from '@/views/login/Register.vue'
import Profile from '@/views/settings/Profile.vue'
import UserManagement from '@/views/user/UserManagement.vue'
import GamesHome from '@/views/game/Home.vue'
import Sjoelen from '@/views/game/sjoelen/Games.vue'
import SjoelenDetails from '@/views/game/sjoelen/GameDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/games'
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
      component: GamesHome
    },
    {
      path: '/games/sjoelen',
      name: 'sjoelen',
      component: Sjoelen
    },
    {
      path: '/games/sjoelen/:id',
      name: 'sjoelen-details',
      component: SjoelenDetails,
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/users',
      name: 'Users',
      component: UserManagement,
      beforeEnter: requireAuth
    },
  ]
})
export default router