<template>
  <v-container fluid class="game-details-container pa-0">
    <v-card flat color="surface-variant" class="header-card">
      <v-container class="px-4 py-3">
        <v-row align="center" no-gutters>
          <v-col>
            <div class="d-flex align-center">
              <v-btn icon="mdi-arrow-left" variant="text" @click="goBackToGames" class="mr-3" />
              <h2 class="text-h5 font-weight-bold mb-0">{{ game?.name || 'Game Details' }}</h2>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <div class="game-content">
      <!-- Loading state -->
      <div v-if="loading" class="d-flex justify-center align-center h-100">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="d-flex justify-center align-center h-100">
        <v-alert type="error" text>{{ error }}</v-alert>
      </div>

      <!-- Game content -->
      <template v-else-if="game">
        <game-round :round="game.round" />
        <game-scoreboard :players="game.players" :game-id="id" />
      </template>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameScoreboard from '../components/game/GameScoreboard.vue'
import GameRound from '../components/game/GameRound.vue'
import { getGameById } from '../services/games'
import type { Game } from '../types/game'

export default defineComponent({
  name: 'GameDetails',
  components: {
    GameScoreboard,
    GameRound
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      game: null as Game | null,
      loading: true,
      error: null as string | null
    }
  },
  async created() {
    try {
      this.game = await getGameById(this.id)
      if (!this.game) {
        this.error = 'Game not found'
      }
    } catch (err) {
      this.error = (err as Error).message
    } finally {
      this.loading = false
    }
  },
  methods: {
    goBackToGames() {
      this.$router.push('/games')
    }
  }
})
</script>

<style scoped>
.game-details-container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: var(--v-surface-variant);
}

.game-content {
  flex: 1;
  overflow-y: auto;
}

.header-card {
  border-bottom: 1px solid var(--v-surface-bright);
}

.h-100 {
  height: 100%;
}
</style>