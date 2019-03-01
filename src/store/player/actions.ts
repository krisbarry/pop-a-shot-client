import { ActionTree } from 'vuex'
import { PlayerService } from '@/store/player/service'
import { Player, PlayerState } from '@/store/player/types'

const playerService = new PlayerService()

export const actions: ActionTree<PlayerState, any> = {

  async getPlayers({ commit, state }): Player[] {
  }
}