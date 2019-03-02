import { GetterTree } from 'vuex'
import { Player, PlayerState } from '@/store/player/types'

export const getters: GetterTree<PlayerState, any> = {

    error(state): any {
        return state.error
    },

    player(state): Player {
        return state.player
    },

    players(state): Player[] {
        return state.players
    }
}
