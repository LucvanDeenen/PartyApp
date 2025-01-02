import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { getAuth } from 'firebase/auth'

export const requireAuth = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const auth = getAuth()
  
  if (!auth.currentUser) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}