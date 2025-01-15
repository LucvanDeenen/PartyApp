export interface Player {
  id: string
  name: string
  role: string
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
  createdBy: string
}