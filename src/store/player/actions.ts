import { ActionTree } from 'vuex'
import { PlayerService } from '@/store/player/service'
import { Player, PlayerState } from '@/store/player/types'

const playerService = new PlayerService()

export const actions: ActionTree<PlayerState, any> = {

  async deletePlayer({ commit }, playerToDelete: Player) {
    commit('deletePlayer', playerToDelete)
  },

  async resetPlayer({ commit }) {
    commit('clearPlayerAttributes')
  },

  async savePlayer({ commit, state }, playerToSave: Player) {
    playerService.savePlayer(playerToSave)
    commit('updatePlayer')
  },

  async setPlayer({ commit, state }, player: Player) {
    commit('setPlayer', player)
  }
}
