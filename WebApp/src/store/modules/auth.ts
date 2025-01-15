import { ActionTree, GetterTree, Module, MutationTree } from 'vuex/types/index.js'
import { RootState, AuthState } from '../types'
import { auth, db } from '../../../firebase'
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
import guestNames from '@/store/data/auth-guest.json'
import { UserRole } from '@/store/data/roles'
import { doc, DocumentData, DocumentSnapshot, getDoc } from 'firebase/firestore'
import { Player } from '@/types/game'

const mutations: MutationTree<AuthState> = {
  SET_USER(state: AuthState, user: User | null) {
    state.user = user
  },
  SET_LOADING(state: AuthState, loading: boolean) {
    state.loading = loading
  },
  SET_ROLE(state: AuthState, role: string) {
    state.role = role;
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
      }

      auth.onAuthStateChanged((user: User | null) => {
        commit('SET_USER', user)
        commit('SET_LOADING', false)
      })
    } catch (error) {
      console.error('Error setting persistence:', error)
      throw error
    }
  },

  async signIn({ commit }, { email, password }: { email: string; password: string }): Promise<void> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password)
      const user: User = userCredential.user
      commit('SET_USER', user)

      const playerDoc: DocumentSnapshot<DocumentData> = await getDoc(doc(db, 'players', user.uid));
      if (playerDoc.data() === undefined) {
        commit('SET_ROLE', UserRole.GUEST)
        console.error('Error fetching profile')
        return;
      }

      const player: Player = playerDoc.data() as Player
      commit('SET_ROLE', player.role)
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  },

  async signInAsGuest({ commit, dispatch }, { name }: { name: string; }): Promise<void> {
    try {
      const userCredential: UserCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      commit('SET_USER', user);
      commit('SET_ROLE', UserRole.GUEST);

      await dispatch('players/addPlayer', { id: user.uid, name, role: UserRole.GUEST }, { root: true });
    } catch (error) {
      console.error('Error signing in as guest:', error);
      throw error;
    }
  },

  async signUp({ commit, dispatch }, { email, password, name }: { email: string; password: string; name: string; role?: UserRole }): Promise<void> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      commit('SET_USER', user);
      commit('SET_ROLE', UserRole.USER);

      await dispatch('players/addPlayer', { id: user.uid, name, role: UserRole.USER }, { root: true });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  async signOut({ commit }): Promise<void> {
    try {
      await signOut(auth)
      commit('SET_USER', null)
      commit('SET_ROLE', '');
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }
}

const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated: (state: AuthState): boolean => !!state.user,
  currentUser: (state: AuthState): User | null => state.user,
  userRole: (state: AuthState): string => state.role,
}

const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state: (): AuthState => ({
    user: null,
    loading: true,
    role: ''
  }),
  mutations,
  actions,
  getters
}

export default authModule
