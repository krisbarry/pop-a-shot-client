import { GetterTree } from 'vuex'
import { Game, GameState } from '@/store/game/types'

export const getters: GetterTree<GameState, any> = {

    error(state): any {
        return state.error
    },

    game(state): Game {
        return state.game
    }
}
