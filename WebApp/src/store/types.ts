import { User } from 'firebase/auth'
import type { Game, Player } from '../types/game'

export interface RootState {
  auth: AuthState
  theme: ThemeState
  players: PlayersState
  games: GamesState
}

export interface AuthState {
  user: User | null
  isGuest: boolean
  loading: boolean
  role: string
}

export interface ThemeState {
  current: string
}

export interface GamesState {
  games: Game[]
  currentGame: Game | null
  loading: boolean
  error: string | null
}


export interface AuthGetters {
  isAuthenticated: boolean
  currentUser: User | null
  isGuest: boolean
}

export interface ThemeState {
  current: string
}

export interface PlayersState {
  players: Player[]
  loading: boolean
  error: string | null
}
