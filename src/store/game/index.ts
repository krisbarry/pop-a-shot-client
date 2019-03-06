import { Module } from 'vuex'
import { actions } from '@/store/game/actions'
import { getters } from '@/store/game/getters'
import { mutations } from '@/store/game/mutations'
import { Game, GameState, PlayerScore } from '@/store/game/types'

const state: GameState = {
    error: {},
    game: {
      player1: {} as PlayerScore,
      player2: {} as PlayerScore
    } as Game,
    games: []
  }

export const game: Module<GameState, any> = {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}
