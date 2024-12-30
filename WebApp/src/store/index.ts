import { createStore } from 'vuex'
import { RootState } from './types'
import auth from './modules/auth'

export default createStore<RootState>({
  modules: {
    auth
  }
})