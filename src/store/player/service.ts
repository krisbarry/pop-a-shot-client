import _ from 'lodash'
import axios from 'axios'
import { Player } from '@/store/player/types'

const players: Player[] = [{
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

export class PlayerService {

    public async deletePlayer(playerToDelete: Player): Promise<any> {
        const playerToDeleteIndex = players.findIndex( (player: Player) => player.id === playerToDelete.id)
        players.splice(playerToDeleteIndex, 1)
    }

    public async getAllPlayers(): Promise<Player[]> {
        return _.cloneDeep(players)
    }

    public async savePlayer(player: Player): Promise<any> {
        const playerToSave = _.cloneDeep(player)
        if (!playerToSave.id) {
            playerToSave.id = (players.length + 1)
            players.push(playerToSave)
        }
    }
}
