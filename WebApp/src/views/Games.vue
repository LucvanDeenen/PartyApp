<template>
  <v-container fluid class="games-container pa-0">
    <div class="games-list">
      <div class="d-flex justify-space-between align-center px-4 py-3">
        <h2 class="text-h6 mb-0">Active Games</h2>
        <v-btn
          color="primary"
          variant="tonal"
          rounded="pill"
          size="small"
          class="px-3"
          prepend-icon="mdi-plus"
          @click="createNewGame"
        >
          Add Game
        </v-btn>
      </div>

      <game-search @search="handleSearch" />

      <game-row
        v-for="game in games"
        :key="game.id"
        :game="game"
        @click="navigateToGame(game)"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import GameRow from '../components/GameRow.vue'
import GameSearch from '../components/GameSearch.vue'
import { useGames } from '../stores/games'
import type { Game } from '../types/game'

const router = useRouter()
const { games, setSearchQuery } = useGames()

const navigateToGame = (game: Game) => {
  router.push(`/games/${game.id}`)
}

const createNewGame = () => {
  // Implement new game creation logic
  console.log('Creating new game')
}

const handleSearch = (query: string) => {
  setSearchQuery(query)
}
</script>

<style scoped>
.games-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.games-list {
  flex: 1;
  overflow-y: auto;
}

/* Custom Scrollbar Styling */
.games-list::-webkit-scrollbar {
  width: 8px;
}

.games-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.games-list::-webkit-scrollbar-thumb {
  background: rgb(25, 118, 210);
  border-radius: 4px;
}

.games-list::-webkit-scrollbar-thumb:hover {
  background: rgb(0, 255, 255);
}
</style>