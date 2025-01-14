import { ActionTree, GetterTree, Module, MutationTree } from 'vuex/types/index.js'
import { RootState, AuthState } from '../types'
import { auth } from '../../../firebase'
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInAnonymously,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth'
import guestNames from '../data/auth-guest.json'

const mutations: MutationTree<AuthState> = {
  SET_USER(state: AuthState, user: User | null) {
    state.user = user
  },
  SET_IS_GUEST(state: AuthState, isGuest: boolean) {
    state.isGuest = isGuest
  },
  SET_LOADING(state: AuthState, loading: boolean) {
    state.loading = loading
  }
}

const actions: ActionTree<AuthState, RootState> = {
  async getRandomGuestName(): Promise<string> {
    const randomIndex = Math.floor(Math.random() * guestNames.length);
    return guestNames[randomIndex];
  },

  async init({ commit }): Promise<void> {
    try {
      await setPersistence(auth, browserLocalPersistence)
      const user: User | null = auth.currentUser;

      if (user) {
        commit('SET_USER', user)
        commit('SET_LOADING', false)

        if (user.isAnonymous) {
          commit('SET_IS_GUEST', true)
        }
      }


      auth.onAuthStateChanged((user: User | null) => {
        commit('SET_USER', user)
        commit('SET_LOADING', false)
        if (user?.isAnonymous) {
          commit('SET_IS_GUEST', true)
        }
      })
    } catch (error) {
      console.error('Error setting persistence:', error)
      throw error
    }
  },

  async signIn({ commit }, { email, password }: { email: string; password: string }): Promise<void> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      commit('SET_USER', user)
      commit('SET_IS_GUEST', false)
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  },

  async signInAsGuest({ commit, dispatch }, { name }: { name: string }): Promise<void> {
    try {
      const userCredential: UserCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      commit('SET_USER', user);
      commit('SET_IS_GUEST', true)

      await dispatch('players/addPlayer', { id: user.uid, name }, { root: true });
    } catch (error) {
      console.error('Error signing in as guest:', error);
      throw error;
    }
  },

  async signUp({ commit, dispatch }, { email, password, name }: { email: string; password: string; name: string }): Promise<void> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      commit('SET_USER', user);

      await dispatch('players/addPlayer', { id: user.uid, name }, { root: true });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  async signOut({ commit }): Promise<void> {
    try {
      await signOut(auth)
      commit('SET_USER', null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }
}

const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated: (state: AuthState): boolean => !!state.user,
  currentUser: (state: AuthState): User | null => state.user,
  isGuest: (state: AuthState): boolean => state.user?.isAnonymous || false,
}

const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state: (): AuthState => ({
    user: null,
    isGuest: false,
    loading: true
  }),
  mutations,
  actions,
  getters
}

export default authModule
