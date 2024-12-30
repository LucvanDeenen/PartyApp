<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <v-btn prepend-icon="mdi-arrow-left" variant="text" @click="goBackToGames">
          Back to Games
        </v-btn>
      </v-col>
    </v-row>

    <!-- Render game details if a game is found -->
    <div v-if="loading" class="d-flex justify-center pa-4">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else-if="error" class="text-center pa-4 text-error">
      {{ error }}
    </div>

    <template v-else>
      <v-row>
        <v-col cols="12" md="8" class="mx-auto">
          <game-scoreboard :title="game!.name" :players="game!.players" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GameScoreboard from '../components/game/GameScoreboard.vue'

import { getGameById } from '../services/games'
import type { Game } from '../types/game'

export default defineComponent({
  name: 'GameDetails',
  components: {
    GameScoreboard
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