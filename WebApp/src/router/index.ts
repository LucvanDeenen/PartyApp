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