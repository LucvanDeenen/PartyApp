import { User } from 'firebase/auth'

export interface RootState {
  auth: AuthState
}

export interface AuthState {
  user: User | null
  loading: boolean
}

export interface AuthGetters {
  isAuthenticated: boolean
  currentUser: User | null
  isGuest: boolean
  userName: string
}

export interface AuthMutations {
  SET_USER: User | null
  SET_LOADING: boolean
}