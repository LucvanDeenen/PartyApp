import { collection, setDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'
import { PlayersState, RootState } from '../types'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex/types/index.js'
import { Player } from '@/types/game'

const playersCollection = collection(db, 'players')

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
  async fetchPlayers({ commit, dispatch, getters }): Promise<void> {
    const storedPlayers: Player[] = getters.allPlayers;
    if (storedPlayers && storedPlayers.length > 0) {
      return;
    }

    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    dispatch('subscibeToPlayers');
  },

  async subscibeToPlayers({ commit, dispatch }): Promise<void> {
    try {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      onSnapshot(playersCollection, (querySnapshot) => {
        
        const players: Player[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Player[];

        commit('SET_PLAYERS', players);
      });
    } catch (error) {
      commit('SET_ERROR', (error as Error).message);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async addPlayer({ }, newPlayer: Player): Promise<void> {
    try {
      const playerDocRef = doc(playersCollection, newPlayer.id);
      await setDoc(playerDocRef, newPlayer);
    } catch (error) {
      console.error('Error adding player:', error);
      throw error;
    }
  },

  async deletePlayer({ commit, state, dispatch }, playerId: string): Promise<void> {
    try {
      // await deleteDoc(doc(db, 'players', playerId));
      await dispatch('users/removeUser', playerId, { root: true });
      // commit('SET_PLAYERS', state.players.filter(player => player.id !== playerId));
    } catch (error) {
      console.error('Error deleting player:', error);
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
