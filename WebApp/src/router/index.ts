import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth } from './guards'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Games from '../views/Games.vue'
import GameDetails from '../views/GameDetails.vue'

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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/games',
      name: 'games',
      component: Games,
      beforeEnter: requireAuth
    },
    {
      path: '/games/:id',
      name: 'game-details',
      component: GameDetails,
      props: true,
      beforeEnter: requireAuth
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: requireAuth
    }
  ]
})

export default router