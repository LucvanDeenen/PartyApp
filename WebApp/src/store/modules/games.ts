import { Module } from 'vuex'
import { RootState } from '../types'
import type { Game, PlayerScore } from '../../types/game'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../../firebase'

export interface GamesState {
  games: Game[]
  currentGame: Game | null
  loading: boolean
  error: string | null
}

const gamesCollection = collection(db, 'games')

const gamesModule: Module<GamesState, RootState> = {
  namespaced: true,

  state: (): GamesState => ({
    games: [],
    currentGame: null,
    loading: false,
    error: null
  }),

  mutations: {
    SET_GAMES(state, games: Game[]) {
      state.games = games
    },
    SET_CURRENT_GAME(state, game: Game | null) {
      state.currentGame = game
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading
    },
    SET_ERROR(state, error: string | null) {
      state.error = error
    }
  },

  actions: {
    async fetchGames({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const snapshot = await getDocs(gamesCollection)
        const games = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Game[]
        commit('SET_GAMES', games)
      } catch (error) {
        commit('SET_ERROR', (error as Error).message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createGame({ dispatch, rootState, commit }, { name, players }: { name: string; players: PlayerScore[] }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        const userId = rootState.auth.user?.uid
        if (!userId) throw new Error('User not authenticated')

        const gameData = {
          name,
          players,
          round: 0,
          createdBy: userId,
        }

        await addDoc(gamesCollection, gameData)
        await dispatch('fetchGames')
      } catch (error) {
        commit('SET_ERROR', (error as Error).message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchGameById({ state, commit }, documentId: string) {
      if (state.currentGame?.id === documentId) {
        return;
      }
    
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
    
      try {
        const docRef = doc(gamesCollection, documentId)
        const docSnap = await getDoc(docRef)
    
        if (!docSnap.exists()) {
          throw new Error(`Game with id "${documentId}" does not exist.`)
        }
    
        const gameData = docSnap.data() as Game
        commit('SET_CURRENT_GAME', { id: documentId, ...gameData })
      } catch (error) {
        commit('SET_ERROR', (error as Error).message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    

    async updatePlayerScore({ commit, dispatch }, { documentId, playerId, newScore }:
      { documentId: string; playerId: string; newScore: number }
    ) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const docRef = doc(gamesCollection, documentId)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
          throw new Error(`Game with id "${documentId}" does not exist.`)
        }

        const gameData = docSnap.data() as Game

        const updatedPlayers = gameData.players.map((playerScore: PlayerScore) => {
          if (playerScore.player.id === playerId) {
            return { ...playerScore, score: newScore }
          }
          return playerScore
        })

        await updateDoc(docRef, {
          players: updatedPlayers,
        })

        await dispatch('fetchGameById', documentId)
      } catch (error) {
        commit('SET_ERROR', (error as Error).message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },

  // Getters
  getters: {
    allGames: (state) => state.games,
    currentGame: (state) => state.currentGame,
    isLoading: (state) => state.loading,
    error: (state) => state.error
  }
}

export default gamesModule
