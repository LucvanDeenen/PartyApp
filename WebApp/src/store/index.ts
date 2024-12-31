import { createStore } from 'vuex'
import { RootState } from './types'
import auth from './modules/auth'
import theme from './modules/theme'

export default createStore<RootState>({
  modules: {
    auth,
    theme
  }
})