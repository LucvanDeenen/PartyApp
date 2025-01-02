import { createStore } from 'vuex'
import { RootState } from './types'
import auth from './modules/auth'
import theme from './modules/theme'
import players from './modules/players'
import games from './modules/games'

export default createStore<RootState>({
  modules: {
    auth,
    theme,
    players,
    games
  }
})