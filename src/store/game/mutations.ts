import { MutationTree } from 'vuex'
import { Player } from '@/store/player/types'
import { Game, GameState } from '@/store/game/types'

export const mutations: MutationTree<GameState> = {

    gamesFound(state: GameState, games: Game[]) {
        state.games = games
    },

    gameStarted(state: GameState) {
        state.game.date = new Date()
        state.game.player1.score = 0
        state.game.player2.score = 0
    },

    setGamePlayers(state: GameState, gamePlayers: Player[]) {
        state.game.player1 = {
            score: 0,
            player: gamePlayers[0]
        }
        state.game.player2 = {
            score: 0,
            player: gamePlayers[1]
        }
    }
}
