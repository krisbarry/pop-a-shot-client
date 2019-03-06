import { ActionTree } from 'vuex'
import { PlayerService } from '@/store/player/service'
import { Player, PlayerState } from '@/store/player/types'

const playerService = new PlayerService()

export const actions: ActionTree<PlayerState, any> = {

  async deletePlayer({ commit, dispatch }, playerToDelete: Player) {
    try {
      await playerService.deletePlayer(playerToDelete)
      dispatch('getAllPlayers')
    } catch (e) {
      commit('setError')
    }
  },

  async getAllPlayers({ commit }) {
    try {
      const players = await playerService.getAllPlayers()
      commit('setPlayers', players)
      } catch (e) {
      commit('setError')
    }
  },

  async resetPlayer({ commit }) {
    commit('clearPlayerAttributes')
  },

  async savePlayer({ commit, dispatch }, playerToSave: Player) {
    try {
      await playerService.savePlayer(playerToSave)
      dispatch('getAllPlayers')
    } catch (e) {
      commit('setError')
    }
  },

  async setPlayer({ commit, state }, player: Player) {
    commit('setPlayer', player)
  }
}
