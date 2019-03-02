export interface Icon {
    url?: any
    file?: any
    fileName?: string
}

export interface Player {
    lastName: string
    firstName: string
    userName: string
    password?: string
    teamName: string
    teamIcon: Icon
    friends: Player[]
}

export interface PlayerState {
    error: any
    player: Player
    players: Player[]
}
