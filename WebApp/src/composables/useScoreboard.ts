import { computed, type ComputedRef } from 'vue'
import type { PlayerScore } from '../types/game'

interface ScoreboardComposable {
  sortedPlayers: ComputedRef<PlayerScore[]>
  highestScore: ComputedRef<number>
  getPlayerClass: (player: PlayerScore) => { leader: boolean }
}

export function useScoreboard(players: PlayerScore[]): ScoreboardComposable {
  const sortedPlayers = computed(() => 
    [...players].sort((a, b) => b.score - a.score)
  )

  const highestScore = computed(() => 
    Math.max(...players.map(p => p.score))
  )

  const getPlayerClass = (player: PlayerScore) => ({
    leader: player.score === highestScore.value
  })

  return {
    sortedPlayers,
    highestScore,
    getPlayerClass
  }
}