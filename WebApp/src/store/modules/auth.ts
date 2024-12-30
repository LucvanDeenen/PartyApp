import { Module } from 'vuex'
import { auth } from '../../../firebase'
import { User } from 'firebase/auth'
import { RootState, AuthState } from '../types'

const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  
  state: (): AuthState => ({
    user: null,
    loading: true
  }),

  getters: {
    isAuthenticated: (state: any): boolean => !!state.user,
    currentUser: (state: any): User | null => state.user,
    isGuest: (state: any): boolean => state.user?.isAnonymous || false,
    userName: (state: any): string => state.user?.displayName || ''
  },

  mutations: {
    SET_USER(state: any, user: User | null) {
      state.user = user
    },
    SET_LOADING(state: any, loading: boolean) {
      state.loading = loading
    }
  },

  actions: {
    init({ commit }: any) {
      auth.onAuthStateChanged((user) => {
        commit('SET_USER', user)
        commit('SET_LOADING', false)
      })
    },

    setUser({ commit }: any, user: User | null) {
      commit('SET_USER', user)
    }
  }
}

export default authModule