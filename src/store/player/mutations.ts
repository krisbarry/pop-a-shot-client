import _ from 'lodash'
import { MutationTree } from 'vuex'
import { Player, PlayerState } from '@/store/player/types'

export const mutations: MutationTree<PlayerState> = {

    clearPlayerAttributes(state: PlayerState) {
        state.player = {
            firstName: '',
            lastName: '',
            teamName: '',
            userName: '',
            password: '',
            teamIcon: {}
        }
    },

    setError(state: PlayerState, error: any) {
        state.error = error
    },

    setPlayer(state: PlayerState, player: Player) {
        state.player = _.cloneDeep(player)
    },

    setPlayers(state: PlayerState, players: Player[]) {
        state.players = players
    }
}
