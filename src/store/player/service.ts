import axios from 'axios'
import { Player } from '@/store/player/types'

let i = 0 // REMOVE WHEN REMOVE TEMPORARY LOGIC IN savePlayer() FUNCTION

export class PlayerService {

    public async getAllPlayers(): Promise<Player[]> {
        return []
    }

    public async savePlayer(player: Player): Promise<any> {

        /**
         *  TEMPORARY, REMOVE WHEN
         */
        if (!player.id) {
            player.id = ++i
        }
        return player

    }
}
