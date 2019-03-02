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
        state.player.lastName = ''
        state.player.firstName = ''
    },

    setPlayerTeamIcon(state: PlayerState, icon: Icon) {
        state.player.teamIcon = icon
    },

    playersFound(state: PlayerState, players: Player[]) {
        state.players = players
    }
}
