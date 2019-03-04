import { MutationTree } from 'vuex'
import { Player, PlayerState } from '@/store/player/types'
import _ from 'lodash'

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

    deletePlayer(state: PlayerState, playerToDelete: Player) {
        const playerToDeleteIndex = state.players.findIndex( (player) => player.id === playerToDelete.id)
        state.players.splice(playerToDeleteIndex, 1)
    },

    playersFound(state: PlayerState, players: Player[]) {
        state.players = players
    },

    setPlayer(state: PlayerState, player: Player) {
        state.player = _.cloneDeep(player)
    },

    updatePlayer(state: PlayerState) {
        const clonedPlayer = _.cloneDeep(state.player)
        const existingPlayerIndex = state.players.findIndex( (player) => player.id === state.player.id)
        if (existingPlayerIndex > -1) {
            state.players[existingPlayerIndex] = clonedPlayer
        } else {
            state.players.push(clonedPlayer)
        }
    }
}
