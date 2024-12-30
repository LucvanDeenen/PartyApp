export interface Player {
  id: string
  name: string
}

export interface PlayerScore {
  player: Player
  score: number
}

export interface Game {
  id: string
  name: string
  players: PlayerScore[]
  round: number
}