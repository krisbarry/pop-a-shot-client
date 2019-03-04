import { ActionTree } from 'vuex'
import { PlayerService } from '@/store/player/service'
import { Icon, Player, PlayerState } from '@/store/player/types'

const playerService = new PlayerService()

export const actions: ActionTree<PlayerState, any> = {

  async resetPlayer({ commit }) {
    commit('clearPlayerAttributes')
  },

  async setPlayer({ commit, state }, player: Player) {
    commit('setPlayer', player)
  },

  async savePlayer({ commit, state }) {
    console.log('state.player: ' + state.player)
    commit('addPlayer')
  }
}
