import { User } from 'firebase/auth'
import type { PlayersState } from './modules/players'
import type { GamesState } from './modules/games'

export interface RootState {
  auth: AuthState
  theme: ThemeState
  players: PlayersState
  games: GamesState
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