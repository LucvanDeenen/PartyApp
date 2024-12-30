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

      <div v-if="loading" class="d-flex justify-center pa-4">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>

      <div v-else-if="error" class="text-center pa-4 text-error">
        {{ error }}
      </div>

      <template v-else>
        <game-row
          v-for="game in games"
          :key="game.id"
          :game="game"
          @click="navigateToGame(game)"
        />
      </template>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GameRow from '../components/GameRow.vue'
import GameSearch from '../components/GameSearch.vue'
import { useGames } from '../stores/games'
import type { Game } from '../types/game'

// Local state in this component
const games = ref<Game[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Pull getGames from the minimal composable/store
const { getGames } = useGames()

onMounted(async () => {
  try {
    loading.value = true
    games.value = await getGames()
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
})

const router = useRouter()
const navigateToGame = (game: Game) => {
  router.push(`/games/${game.id}`)
}

// Placeholder for creation logic
const createNewGame = () => {
  console.log('Creating new game')
}

// Placeholder for search logic
const handleSearch = (query: string) => {
  console.log('Searching for:', query)
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
