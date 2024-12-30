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

      <!-- GameSearch emits the 'search' event with the user’s query -->
      <game-search @search="handleSearch" />

      <div v-if="loading" class="d-flex justify-center pa-4">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>

      <div v-else-if="error" class="text-center pa-4 text-error">
        {{ error }}
      </div>

      <!-- Render the filtered games if not loading and no error -->
      <template v-else>
        <game-row
          class="ma-5"
          v-for="game in games"
          :key="game.id"
          :game="game"
          @click="navigateToGame(game)"
        />
      </template>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameRow from '../components/game/GameRow.vue'
import GameSearch from '../components/game/GameSearch.vue'
import { getGames } from '../services/games'
import type { Game } from '../types/game'

export default defineComponent({
  name: 'GamesList',
  components: {
    GameRow,
    GameSearch,
  },
  data() {
    return {
      allGames: [] as Game[],
      games: [] as Game[],
      loading: true,
      error: null as string | null,
    }
  },
  async created() {
    try {
      const fetchedGames = await getGames()
      this.allGames = fetchedGames
      this.games = fetchedGames
    } catch (err) {
      this.error = (err as Error).message
    } finally {
      this.loading = false
    }
  },
  methods: {
    navigateToGame(game: Game) {
      this.$router.push(`/games/${game.id}`)
    },
    createNewGame() {
      console.log('Creating new game')
    },
    handleSearch(query: string) {
      if (!query.trim()) {
        this.games = this.allGames
        return
      }

      const lowercaseQuery = query.toLowerCase()
      this.games = this.allGames.filter(game =>
        game.name.toLowerCase().includes(lowercaseQuery)
      )
    },
  },
})
</script>

<style scoped>
.games-container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.games-list {
  flex: 1;
  overflow-y: auto;
}
</style>
