import { ActionTree, GetterTree, Module, MutationTree } from 'vuex/types/index.js'
import { GamesState, RootState } from '../types'
import type { Game, PlayerScore, Player } from '../../types/game'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore'
import { db } from '../../../firebase'

const gamesCollection = collection(db, 'games')

const mutations: MutationTree<GamesState> = {
  SET_GAMES(state: GamesState, games: Game[]) {
    state.games = games
  },
  SET_CURRENT_GAME(state: GamesState, game: Game | null) {
    state.currentGame = game
  },
  SET_LOADING(state: GamesState, loading: boolean) {
    state.loading = loading
  },
  SET_ERROR(state: GamesState, error: string | null) {
    state.error = error
  }
}

const actions: ActionTree<GamesState, RootState> = {
  async fetchGames({ commit }): Promise<void> {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const snapshot: QuerySnapshot = await getDocs(gamesCollection)
      const games: Game[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Game[]
      commit('SET_GAMES', games)
    } catch (error) {
      commit('SET_ERROR', (error as Error).message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createGame({ dispatch, rootState, commit }, { name, players }: { name: string; players: PlayerScore[] }): Promise<void> {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const userId = rootState.auth.user?.uid
      if (!userId) throw new Error('User not authenticated')

      const gameData = {
        name,
        players,
        round: 0,
        createdBy: userId
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

  async fetchGameById({ state, commit }, documentId: string): Promise<void> {
    if (state.currentGame?.id === documentId) {
      return
    }

    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const docRef = doc(gamesCollection, documentId)
      const docSnap: DocumentSnapshot = await getDoc(docRef)

      if (!docSnap.exists()) {
        throw new Error(`Game with id "${documentId}" does not exist.`)
      }

      const gameData = docSnap.data() as Game
      const { id: existingId, ...gameDataWithoutId } = gameData

      commit('SET_CURRENT_GAME', { id: documentId, ...gameDataWithoutId })
    } catch (error) {
      commit('SET_ERROR', (error as Error).message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updatePlayerScore(
    { commit, dispatch },
    { documentId, playerId, newScore }: { documentId: string; playerId: string; newScore: number }
  ): Promise<void> {
    commit('SET_ERROR', null)

    try {
      const docRef = doc(gamesCollection, documentId)
      const docSnap: DocumentSnapshot = await getDoc(docRef)

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
        players: updatedPlayers
      })

      await dispatch('fetchGameById', documentId)
    } catch (error) {
      commit('SET_ERROR', (error as Error).message)
      throw error
    }
  },

  async addPlayersToGame(
    { commit, dispatch },
    { gameId, players }: { gameId: string; players: Player[] }
  ): Promise<void> {
    commit('SET_ERROR', null)

    try {
      const docRef = doc(gamesCollection, gameId)
      const docSnap: DocumentSnapshot = await getDoc(docRef)

      if (!docSnap.exists()) {
        throw new Error(`Game with id "${gameId}" does not exist.`)
      }

      const gameData = docSnap.data() as Game
      const newPlayerScores: PlayerScore[] = players.map(player => ({
        player,
        score: 0
      }))

      await updateDoc(docRef, {
        players: [...gameData.players, ...newPlayerScores]
      })

      await dispatch('fetchGameById', gameId)
    } catch (error) {
      commit('SET_ERROR', (error as Error).message)
      throw error
    }
  }
}

const getters: GetterTree<GamesState, RootState> = {
  allGames: (state: GamesState): Game[] => state.games,
  currentGame: (state: GamesState): Game | null => state.currentGame,
  isLoading: (state: GamesState): boolean => state.loading,
  error: (state: GamesState): string | null => state.error
}

const gamesModule: Module<GamesState, RootState> = {
  namespaced: true,
  state: (): GamesState => ({
    games: [],
    currentGame: null,
    loading: false,
    error: null
  }),
  mutations,
  actions,
  getters
}

export default gamesModule