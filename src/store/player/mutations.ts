import { MutationTree } from 'vuex'
import { Icon, Player, PlayerState } from '@/store/player/types'

export const mutations: MutationTree<PlayerState> = {

    addPlayer(state: PlayerState) {
        state.players.push(state.player)
    },

    clearPlayerAttributes(state: PlayerState) {
        state.player.teamIcon = {}
        state.player.teamName = ''
        state.player.userName = ''
        state.player.password = ''
        state.player.lastName = ''
        state.player.firstName = ''
    },

    setPlayer(state: PlayerState, player: Player) {
        state.player = player
    },

    playersFound(state: PlayerState, players: Player[]) {
        state.players = players
    }
}
