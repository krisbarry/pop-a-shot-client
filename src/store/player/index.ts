import { Module } from 'vuex'
import { actions } from '@/store/player/actions'
import { getters } from '@/store/player/getters'
import { mutations } from '@/store/player/mutations'
import { Player, PlayerState } from '@/store/player/types'

const state: PlayerState = {
    error: {},
    player: {} as Player,
    players: []
  }

export const player: Module<PlayerState, any> = {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}
