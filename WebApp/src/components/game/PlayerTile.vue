<template>
  <v-card :class="[
    'player-tile',
    { 'is-leader': isLeader }
  ]" :elevation="isLeader ? 4 : 1">
    <v-card-text class="pa-4">
      <!-- Header with avatar and name -->
      <div class="d-flex align-center mb-2">
        <v-avatar :color="isLeader ? 'accent' : 'primary'" size="32" class="white--text text-subtitle-2 mr-2">
          {{ getInitials(playerDetails.player.name) }}
        </v-avatar>
        <span class="text-h6">{{ playerDetails.player.name }}</span>
        <v-icon v-if="isLeader" color="accent" icon="mdi-crown" class="ml-2" size="small" />
        <v-spacer />
        <div>
          <v-icon variant="plain" icon="mdi-pencil" density="comfortable" size="small" class="control-btn"
            @click="showScoreDialog = true" />
        </div>
      </div>

      <!-- Score display -->
      <div class="mb-4 d-flex">
        <div class="text-subtitle-1 text-medium-emphasis">
          <v-icon>mdi-star</v-icon><span class="ml-1 text-overline">{{ playerDetails.score }}</span>
          <span v-if="totalPotentialScore > 0" class="text-overline">
            (+{{ totalPotentialScore }})
          </span>
        </div>

        <v-spacer></v-spacer>

        <!-- Confirm/Cancel buttons -->
        <div class="control-buttons" v-if="tempScore > 0">
          <v-icon color="success" variant="tonal" icon="mdi-check" density="comfortable" size="small"
            class="control-btn" @click="confirmScore">
          </v-icon>
          <v-icon color="error" variant="tonal" icon="mdi-close" density="comfortable" size="small" class="control-btn"
            @click="cancelScore">
          </v-icon>
        </div>
      </div>

      <!-- Action buttons container -->
      <div class="action-buttons mb-2">
        <!-- Score buttons -->
        <div class="score-buttons">
          <v-btn v-for="points in [2, 3, 4, 1]" :key="points" color="primary" variant="flat" density="comfortable"
            size="small" class="score-btn" :ripple="false" @click="addToTempScore(points)">
            +{{ points }}
            <span v-if="buttonCounts[points] > 0" class="counter-badge">
              ({{ buttonCounts[points] }})
            </span>
          </v-btn>
        </div>
      </div>
    </v-card-text>

    <!-- Manual Score Dialog -->
    <manual-score-dialog v-model:show="showScoreDialog" :current-score="playerDetails.score"
      @save="handleManualScoreUpdate" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapActions } from 'vuex'
import type { PlayerScore } from '../../types/game'
import ManualScoreDialog from './ManualScoreDialog.vue'

export default defineComponent({
  name: 'PlayerTile',
  components: {
    ManualScoreDialog
  },
  props: {
    playerDetails: {
      type: Object as PropType<PlayerScore>,
      required: true
    },
    isLeader: {
      type: Boolean,
      required: true
    },
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tempScore: 0 as number,
      showScoreDialog: false as boolean,
      buttonCounts: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      } as Record<string, number>,
    }
  },
  computed: {
    completeSets(): number {
      const values = Object.values(this.buttonCounts).filter((v): v is number => typeof v === 'number');
      return Math.min(...values);
    },
    bonusPoints(): number {
      return this.completeSets * 10
    },
    totalPotentialScore(): number {
      return this.tempScore + this.bonusPoints
    }
  },
  methods: {
    ...mapActions('games', ['updatePlayerScore']),
    getInitials(name: string): string {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    },
    async handleManualScoreUpdate(newScore: number) {
      try {
        await this.updatePlayerScore({
          documentId: this.gameId,
          playerId: this.playerDetails.player.id,
          newScore
        })
        this.playerDetails.score = newScore
      } catch (error) {
        console.error('Failed to update score:', error)
      }
    },
    addToTempScore(points: number) {
      this.tempScore += points
      this.buttonCounts[points]++
    },
    async confirmScore() {
      if (this.totalPotentialScore > 0) {
        const newScore = this.playerDetails.score + this.totalPotentialScore
        try {
          await this.updatePlayerScore({
            documentId: this.gameId,
            playerId: this.playerDetails.player.id,
            newScore
          })
          this.playerDetails.score = newScore
          this.tempScore = 0
          this.resetButtonCounts()
        } catch (error) {
          console.error('Failed to update score:', error)
        }
      }
    },
    cancelScore() {
      this.tempScore = 0
      this.resetButtonCounts()
    },
    resetButtonCounts() {
      this.buttonCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      }
    }
  }
})
</script>

<style scoped>
.player-tile {
  transition: all 0.3s ease;
}

.is-leader {
  border: 2px solid var(--v-accent-base);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.score-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
}

.score-btn {
  transition: all 0.2s ease;
  width: 100%;
  height: 50px !important;
  position: relative;
}

.score-btn:hover {
  transform: translateY(-2px);
  background-color: rgb(var(--v-theme-primary));
  color: white;
}

.control-btn {
  transition: all 0.2s ease;
  width: 50px;
  opacity: 0.7;
}

.control-btn:hover {
  transform: translateY(-2px);
  opacity: 1;
  color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.counter-badge {
  font-size: 0.75rem;
  margin-left: 4px;
  opacity: 0.8;
}
</style>