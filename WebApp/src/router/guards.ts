import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { getAuth } from 'firebase/auth'

export const requireAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const auth = getAuth()
  
  if (!auth.currentUser) {
    // Redirect to login with the intended destination
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}