import { ref, computed } from 'vue'
import type { Game } from '../types/game'

// In a real app, this would fetch from an API
const gameData: Game[] = [
  {
    id: 1,
    title: 'Space Explorer',
    genre: 'Adventure',
    imageUrl: 'https://picsum.photos/300/200?random=1',
    description: 'Explore the vast universe in this epic space adventure.',
    players: {
      current: 3,
      max: 4,
      list: [
        { id: 1, name: 'CosmicPlayer', points: 2500 },
        { id: 2, name: 'StarSeeker', points: 1800 },
        { id: 3, name: 'GalaxyRider', points: 3200 }
      ]
    },
    status: 'active',
    ping: 45,
    host: 'CosmicPlayer',
    map: 'Nebula Station',
    created: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Dragon Quest',
    genre: 'RPG',
    imageUrl: 'https://picsum.photos/300/200?random=2',
    description: 'Embark on a magical journey filled with dragons and mysteries.',
    players: {
      current: 4,
      max: 4,
      list: [
        { id: 1, name: 'DragonMaster', points: 5000 },
        { id: 2, name: 'FireBreather', points: 4200 },
        { id: 3, name: 'ScaleLord', points: 3800 },
        { id: 4, name: 'WingRider', points: 4600 }
      ]
    },
    status: 'full',
    ping: 120,
    host: 'DragonMaster',
    map: 'Ancient Ruins',
    created: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Racing Champions',
    genre: 'Racing',
    imageUrl: 'https://picsum.photos/300/200?random=3',
    description: 'Race against the best drivers in the world.',
    players: {
      current: 1,
      max: 8,
      list: [
        { id: 1, name: 'SpeedKing', points: 1200 }
      ]
    },
    status: 'waiting',
    ping: 75,
    host: 'SpeedKing',
    map: 'Mountain Pass',
    created: new Date().toISOString()
  }
]

export function useGames() {
  const games = ref<Game[]>(gameData)
  const searchQuery = ref('')

  const filteredGames = computed(() => {
    if (!searchQuery.value) return games.value
    
    const query = searchQuery.value.toLowerCase()
    return games.value.filter(game => 
      game.title.toLowerCase().includes(query) ||
      game.host.toLowerCase().includes(query) ||
      game.genre.toLowerCase().includes(query) ||
      game.map.toLowerCase().includes(query)
    )
  })

  const getGameById = (id: number) => {
    return games.value.find(g => g.id === id)
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return {
    games: filteredGames,
    getGameById,
    setSearchQuery
  }
}