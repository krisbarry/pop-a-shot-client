import { MutationTree } from 'vuex'
import { Game, GameState } from '@/store/game/types'

export const mutations: MutationTree<GameState> = {

    gamesFound(state: GameState, games: Game[]) {
        state.games = games
    }
}