import { Module } from 'vuex'
import { RootState } from '../types'

export interface ThemeState {
  current: string
}

const themeModule: Module<ThemeState, RootState> = {
  namespaced: true,

  state: (): ThemeState => ({
    current: 'dark'
  }),

  mutations: {
    SET_THEME(state, theme: string) {
      state.current = theme
    }
  },

  actions: {
    updateTheme({ commit }, theme: string) {
      commit('SET_THEME', theme)
    }
  },

  getters: {
    currentTheme: (state) => state.current
  }
}

export default themeModule