export interface Player {
  id: number
  name: string
  points: number
  avatar?: string
}

export interface Game {
  id: number
  title: string
  genre: string
  imageUrl: string
  description: string
  players: {
    current: number
    max: number
    list: Player[]
  }
  status: 'active' | 'waiting' | 'full'
  ping: number
  host: string
  map: string
  created: string
}