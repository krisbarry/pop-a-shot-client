import { Player } from '@/store/player/types'

export interface PlayerScore {
    score: number
    player: Player
}

export interface Game {
    date: Date
    players: PlayerScore[]
}

export interface GameState {
    game: Game
    games: Game[]
    error: any
}
