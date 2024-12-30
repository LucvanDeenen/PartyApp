<template>
  <v-container fluid class="games-container pa-0">
    <div class="games-list">
      <v-card flat color="surface-variant" class="header-card">
        <v-container class="px-4 py-3">
          <v-row align="center" no-gutters>
            <v-col>
              <div class="d-flex align-center">
                <v-icon icon="mdi-gamepad-variant" size="large" class="mr-3" color="primary" />
                <h2 class="text-h5 font-weight-bold mb-0">Active Games</h2>
              </div>
            </v-col>
            <v-col cols="auto">
              <v-btn color="primary" variant="elevated" rounded="pill" class="px-4" prepend-icon="mdi-plus"
                @click="createNewGame">
                New Game
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <game-search @search="handleSearch" />

      <div v-if="loading" class="d-flex justify-center pa-4">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>

      <div v-else-if="error" class="text-center pa-4 text-error">
        {{ error }}
      </div>

      <template v-else>
        <game-row v-for="game in games" :key="game.id" :game="game" class="ma-2" @click="navigateToGame(game)" />
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
  background-color: var(--v-surface-variant);
}

.games-list {
  flex: 1;
  overflow-y: auto;
}

.header-card {
  border-bottom: 1px solid var(--v-surface-bright);
}
</style>