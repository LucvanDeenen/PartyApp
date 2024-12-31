import { Module } from 'vuex'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
import { RootState } from '../types'
import type { Player } from '../../types/game'

export interface PlayersState {
  players: Player[]
  loading: boolean
  error: string | null
}

const playersModule: Module<PlayersState, RootState> = {
  namespaced: true,

  state: (): PlayersState => ({
    players: [],
    loading: false,
    error: null
  }),

  mutations: {
    SET_PLAYERS(state, players: Player[]) {
      state.players = players
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading
    },
    SET_ERROR(state, error: string | null) {
      state.error = error
    }
  },

  actions: {
    async fetchPlayers({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const querySnapshot = await getDocs(collection(db, 'players'))
        const players = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Player[]

        commit('SET_PLAYERS', players)
      } catch (error) {
        commit('SET_ERROR', (error as Error).message)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    allPlayers: (state) => state.players,
    isLoading: (state) => state.loading,
    error: (state) => state.error
  }
}

export default playersModule