<template>
  <v-container fluid class="game-details-container pa-0">
    <v-card flat color="surface-variant" class="header-card">
      <v-container class="px-4 py-3">
        <v-row align="center" no-gutters>
          <v-col>
            <div class="d-flex align-center">
              <v-icon variant="plain" color="primary" size="small" @click="goBackToGames" class="mr-3">
                mdi-arrow-left
              </v-icon>
              <h2 class="text-h5 font-weight-bold mb-0">{{ game?.name || 'Game Details' }}</h2>
            </div>
          </v-col>
          <v-col cols="auto">
            <div class="d-flex align-center">
              <v-btn v-if="canAddPlayers" color="white" disabled variant="tonal" class="mr-4" icon="mdi-cog">
              </v-btn>
              <v-btn v-if="canAddPlayers" color="white" variant="tonal" class="mr-4" icon="mdi-account-plus"
                @click="showAddPlayerModal = true">
              </v-btn>
              <v-icon icon="mdi-flag-checkered" color="primary" class="mr-2" />
              <span class="text-h6">Round {{ game?.round ? game.round + 1 : 1 }}</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <div class="game-content">
      <!-- Loading state -->
      <div v-if="isLoading" class="d-flex justify-center align-center h-100">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </div>

      <!-- Game content -->
      <template v-else-if="game">
        <player-grid :players="game.players" :game-id="id" />
      </template>

      <!-- Error state -->
      <div v-else class="d-flex justify-center align-center h-100 text-error">
        {{ error }}
      </div>
    </div>

    <!-- Add Player Modal -->
    <add-player-modal v-if="game" v-model:show="showAddPlayerModal" :current-players="game.players.map((p: PlayerScore) => p.player)"
      @add="handleAddPlayers" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import PlayerGrid from '../components/game/PlayerGrid.vue'
import AddPlayerModal from '../components/game/AddPlayerModal.vue'
import type { Game, Player, PlayerScore } from '../types/game'

export default defineComponent({
  name: 'GameDetails',
  components: {
    PlayerGrid,
    AddPlayerModal
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showAddPlayerModal: false
    }
  },
  computed: {
    ...mapGetters('games', ['currentGame', 'error', 'isLoading']),
    ...mapGetters('auth', ['currentUser']),
    game(): Game | null {
      return this.currentGame
    },
    canAddPlayers(): boolean {
      if (!this.game || !this.currentUser) return false
      return this.game.players.some((p: PlayerScore) => p.player.id === this.currentUser.uid)
    }
  },
  methods: {
    ...mapActions({
      fetchGameById: 'games/fetchGameById',
      addPlayersToGame: 'games/addPlayersToGame'
    }),
    goBackToGames() {
      this.$router.push('/games')
    },
    async loadGame() {
      try {
        await this.fetchGameById(this.id)
        if (!this.game) {
          this.error = 'Game not found'
        }
      } catch (err) {
        this.error = (err as Error).message
      }
    },
    async handleAddPlayers(players: Player[]) {
      try {
        await this.addPlayersToGame({
          gameId: this.id,
          players
        })
        await this.loadGame()
      } catch (error) {
        console.error('Failed to add players:', error)
      }
    }
  },
  mounted() {
    this.loadGame()
  }
})
</script>

<style scoped>
.game-details-container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: var(--v-surface-variant);
  touch-action: manipulation;
}

.game-content {
  flex: 1;
  overflow-y: auto;
  touch-action: pan-y pinch-zoom;
}

.header-card {
  border-bottom: 1px solid var(--v-surface-bright);
}

.h-100 {
  height: 100%;
}
</style>