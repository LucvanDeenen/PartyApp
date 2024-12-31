import { collection, getDocs, QuerySnapshot, DocumentData, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { PlayersState, RootState } from '../types'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex/types/index.js'
import { Player } from '@/types/game'

const mutations: MutationTree<PlayersState> = {
  SET_PLAYERS(state: PlayersState, players: Player[]) {
    state.players = players
  },
  SET_LOADING(state: PlayersState, loading: boolean) {
    state.loading = loading
  },
  SET_ERROR(state: PlayersState, error: string | null) {
    state.error = error
  }
}

const actions: ActionTree<PlayersState, RootState> = {
  async fetchPlayers({ commit }): Promise<void> {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'players'))
      const players: Player[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Player[]

      commit('SET_PLAYERS', players)
    } catch (error) {
      commit('SET_ERROR', (error as Error).message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async addPlayer({ commit }, { id, name }: { id: string; name: string }): Promise<void> {
    try {
      const newPlayer = {
        id,
        name
      };
      await addDoc(collection(db, 'players'), newPlayer);
    } catch (error) {
      console.error('Error adding player:', error);
      throw error;
    }
  }
}

const getters: GetterTree<PlayersState, RootState> = {
  allPlayers: (state: PlayersState): Player[] => state.players,
  isLoading: (state: PlayersState): boolean => state.loading,
  error: (state: PlayersState): string | null => state.error
}

const playersModule: Module<PlayersState, RootState> = {
  namespaced: true,
  state: (): PlayersState => ({
    players: [],
    loading: false,
    error: null
  }),
  mutations,
  actions,
  getters
}

export default playersModule
