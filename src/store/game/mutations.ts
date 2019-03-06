import { MutationTree } from 'vuex'
import { Player } from '@/store/player/types'
import { Game, GameState } from '@/store/game/types'

export const mutations: MutationTree<GameState> = {

    gamesFound(state: GameState, games: Game[]) {
        state.games = games
    },

    setGamePlayers(state: GameState, gamePlayer: Player[]) {
        state.game.player1 = {
            score: 0,
            player: gamePlayer[0]
        }
        state.game.player2 = {
            score: 0,
            player: gamePlayer[1]
        }
    }
}
