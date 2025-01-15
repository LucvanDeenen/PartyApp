import { collection, getDocs, QuerySnapshot, DocumentData, setDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
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
  async fetchPlayers({ commit, getters }): Promise<void> {
    // const storedPlayers: Player[] = getters.allPlayers;
    // if (storedPlayers && storedPlayers.length > 0) {
    //   console.log("Data already populated");
    //   return;
    // }

    commit('SET_LOADING', true);
    commit('SET_ERROR', null);

    try {
      onSnapshot(playersCollection, (querySnapshot) => {
        console.log('updating data');
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
