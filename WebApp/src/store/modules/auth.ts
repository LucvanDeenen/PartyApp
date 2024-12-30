import { Module } from 'vuex'
import { auth } from '../../../firebase'
import { User } from 'firebase/auth'

interface AuthState {
  user: User | null
  loading: boolean
}

const authModule: Module<AuthState, any> = {
  namespaced: true,
  
  state: () => ({
    user: null,
    loading: true
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    isGuest: (state) => state.user?.isAnonymous || false,
    userName: (state) => state.user?.displayName || ''
  },

  mutations: {
    SET_USER(state, user: User | null) {
      state.user = user
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading
    }
  },

  actions: {
    init({ commit }) {
      auth.onAuthStateChanged((user) => {
        commit('SET_USER', user)
        commit('SET_LOADING', false)
      })
    }
  }
}

export default authModule