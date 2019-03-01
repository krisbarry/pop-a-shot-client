export interface Player {
    lastName: string
    firstName: string
    userName: string
    password?: string
    teamName: string
    teamIcon: string
    friends: Player[]
}

export interface PlayerState {
    error: any
    players: Player[]
}
