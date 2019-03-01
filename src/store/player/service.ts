import axios from 'axios'
import { Player } from '@/store/player/types'

export class PlayerService {

    public async getAllPlayers(): Promise<Player[]> {
        return []
    }

    public async savePlayer(player: Player): Promise<any> {
    }
}