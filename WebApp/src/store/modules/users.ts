import { ActionTree, Module } from 'vuex/types/index.js'
import { RootState } from '../types'

const actions: ActionTree<null, RootState> = {
  async removeUser({ }, uid: string): Promise<void> {
    try {
    } catch (error) {
      console.error('Error removing user data:', error);
      throw error;
    }
  },
  async getUser({ }, uid: string): Promise<void> {
    try {

    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
}

const userModule: Module<null, RootState> = {
  namespaced: true,
  state: (): null => null,
  actions,
}

export default userModule
