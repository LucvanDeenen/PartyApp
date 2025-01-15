import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { RootState } from './types'
import auth from './modules/auth'
import theme from './modules/theme'
import players from './modules/players'
import games from './modules/games'
import users from './modules/users'

export default createStore<RootState>({
  modules: {
    auth,
    theme,
    players,
    games,
    users
  },
  plugins: [createPersistedState()]
})