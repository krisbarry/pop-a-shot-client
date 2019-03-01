import { ActionTree } from 'vuex'
import { GameState } from '@/store/game/types'
import { GameService } from '@/store/game/service'

const gameService = new GameService()

export const actions: ActionTree<GameState, any> = {

  async startGame({ commit, state }) {
  }
}