import { MutationTree } from 'vuex'
import { Player, PlayerState } from '@/store/player/types'

export const mutations: MutationTree<PlayerState> = {

    playersFound(state: PlayerState, players: Player[]) {
        state.players = players
    }
}