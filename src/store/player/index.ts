import { Module } from 'vuex'
import { actions } from '@/store/player/actions'
import { getters } from '@/store/player/getters'
import { mutations } from '@/store/player/mutations'
import { PlayerState } from '@/store/player/types'

const state: PlayerState = {
    error: {},
    players: []
  }

export const player: Module<PlayerState, any> = {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}
