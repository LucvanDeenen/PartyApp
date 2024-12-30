import { Module } from 'vuex'
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
import { RootState, AuthState } from '../types'

const authModule: Module<AuthState, RootState> = {
  namespaced: true,

  state: (): AuthState => ({
    user: null,
    loading: true,
  }),

  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.user,
    currentUser: (state: AuthState): User | null => state.user,
    isGuest: (state: AuthState): boolean => state.user?.isAnonymous || false,
    userName: (state: AuthState): string => state.user?.displayName || '',
  },

  mutations: {
    SET_USER(state: AuthState, user: User | null) {
      state.user = user
    },
    SET_LOADING(state: AuthState, loading: boolean) {
      state.loading = loading
    },
  },

  actions: {
    init({ commit }: any) {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          const user = auth.currentUser;
          if (user) {
            commit('SET_USER', user);
            commit('SET_LOADING', false)
          }

          auth.onAuthStateChanged((user) => {
            commit('SET_USER', user)
            commit('SET_LOADING', false)
          })
        })
        .catch((error) => {
          console.error('Error setting persistence:', error)
        })
    },

    async signIn({ commit }: any, { email, password }: any) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        commit('SET_USER', user)
      } catch (error) {
        console.error('Error signing in:', error)
      }
    },

    async signInAsGuest({ commit }: any, guestName: string) {
      try {
        const userCredential = await signInAnonymously(auth)
        const user = userCredential.user

        // Set the display name for the guest user
        await updateProfile(user, { displayName: guestName })
        commit('SET_USER', user)
      } catch (error) {
        console.error('Error signing in as guest:', error)
        throw error
      }
    },

    async signUp({ commit }: any, { email, password }: { email: string; password: string }) {
      try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        commit('SET_USER', user)
      } catch (error) {
        console.error('Error signing up:', error)
        throw error
      }
    },

    async signOut({ commit }: any) {
      try {
        await signOut(auth)
        commit('SET_USER', null)
      } catch (error) {
        console.error('Error signing out:', error)
      }
    },
  },
}

export default authModule
