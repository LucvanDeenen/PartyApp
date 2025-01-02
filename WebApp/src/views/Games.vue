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
                @click="showCreateModal = true">
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
        <game-row v-for="game in filteredGames" :key="game.id" :game="game" class="ma-2" @click="navigateToGame(game)" />
      </template>
    </div>

    <create-game-modal
      v-model:show="showCreateModal"
      @create="handleGameCreate"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import GameRow from '../components/game/GameRow.vue'
import GameSearch from '../components/game/GameSearch.vue'
import CreateGameModal from '../components/game/CreateGameModal.vue'
import type { Game, PlayerScore } from '../types/game'

export default defineComponent({
  name: 'GamesList',
  components: {
    GameRow,
    GameSearch,
    CreateGameModal
  },
  data() {
    return {
      searchQuery: '',
      showCreateModal: false
    }
  },
  computed: {
    ...mapGetters('games', ['allGames', 'isLoading', 'error']),
    filteredGames(): Game[] {
      if (!this.searchQuery) return this.allGames
      
      const query = this.searchQuery.toLowerCase()
      return this.allGames.filter((game: Game) => 
        game.name.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    ...mapActions('games', ['fetchGames', 'createGame']),
    navigateToGame(game: Game) {
      this.$router.push(`/games/${game.id}`)
    },
    handleSearch(query: string) {
      this.searchQuery = query
    },
    async handleGameCreate(gameData: { name: string, players: PlayerScore[] }) {
      try {
        await this.createGame(gameData)
      } catch (error) {
        console.error('Failed to create game:', error)
      }
    }
  },
  async created() {
    await this.fetchGames()
  }
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