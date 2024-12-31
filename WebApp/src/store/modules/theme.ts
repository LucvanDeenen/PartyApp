import { RootState, ThemeState } from '../types'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex/types/index.js'


const mutations: MutationTree<ThemeState> = {
  SET_THEME(state: ThemeState, theme: string) {
    state.current = theme
  }
}

const actions: ActionTree<ThemeState, RootState> = {
  updateTheme({ commit }, theme: string) {
    commit('SET_THEME', theme)
  }
}

const getters: GetterTree<ThemeState, RootState> = {
  currentTheme: (state: ThemeState): string => state.current
}

const themeModule: Module<ThemeState, RootState> = {
  namespaced: true,
  state: (): ThemeState => ({
    current: 'dark'
  }),
  mutations,
  actions,
  getters
}

export default themeModule
