import _ from 'lodash'
// import axios from 'axios'
import { Player } from '@/store/player/types'

export class PlayerService {
    private players: Player[] = [{
        id: 1,
        firstName: 'Chuck',
        lastName: 'Barry',
        teamName: 'Chuck-a-roo',
        userName: 'kris@krisbarry.com'
    },
    {
        id: 2,
        firstName: 'Jakob',
        lastName: 'Barry',
        teamName: 'Jake the Snake',
        userName: 'jake@krisbarry.com'
    }]

    public async deletePlayer(playerToDelete: Player): Promise<any> {
        const playerToDeleteIndex = this.players.findIndex( (player: Player) => player.id === playerToDelete.id)
        this.players.splice(playerToDeleteIndex, 1)
    }

    public async getAllPlayers(): Promise<Player[]> {
        return _.cloneDeep(this.players)
    }

    public async savePlayer(player: Player): Promise<any> {
        const playerToSave = _.cloneDeep(player)
        if (!playerToSave.id) {
            playerToSave.id = (this.players.length + 1)
            this.players.push(playerToSave)
        }
    }
}
