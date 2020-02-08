// import axios from 'axios'
import { Game } from '@/store/game/types'

export class GameService {
    private games: Game[] = []

    public async saveGame(game: Game): Promise<any> {
        this.games.push(game)
    }
}
