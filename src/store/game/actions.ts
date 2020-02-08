import { ActionTree } from 'vuex'
import { Player } from '@/store/player/types'
import { GameState } from '@/store/game/types'
import { GameService } from '@/store/game/service'

const gameService = new GameService()

export const actions: ActionTree<GameState, any> = {

  async addGamePlayers({ commit }, gamePlayers: Player[]) {
    commit('setGamePlayers', gamePlayers)
  },

  async saveGame({ commit, state }) {
    try {
      gameService.saveGame(state.game)
      // commit('gameSaved')
    } catch (e) {
      commit('setError', e)
    }
  },

  async startGame({ commit, state }) {
    commit('gameStarted')
  }
}
