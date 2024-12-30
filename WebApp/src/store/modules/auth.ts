import { Module } from 'vuex'
import { auth } from '../../../firebase'
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
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
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          auth.onAuthStateChanged((user) => {
            commit('SET_USER', user)
            commit('SET_LOADING', false)
          })
        })
        .catch((error) => {
          console.error('Error setting persistence:', error);
        });
    },
    async signIn({ commit }: any, { email, password }: any) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        commit('SET_USER', user);
      } catch (error) {
        console.error('Error signing in:', error);
      }
    },
    signOut({ commit }: any) {
      signOut(auth)
        .then(() => {
          commit('SET_USER', null);
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
    },
  }
}

export default authModule