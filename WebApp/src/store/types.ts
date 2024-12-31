import { User } from 'firebase/auth'

export interface RootState {
  auth: AuthState
  theme: ThemeState
}

export interface AuthState {
  user: User | null
  loading: boolean
}

export interface ThemeState {
  current: string
}

export interface AuthGetters {
  isAuthenticated: boolean
  currentUser: User | null
  isGuest: boolean
  userName: string
}