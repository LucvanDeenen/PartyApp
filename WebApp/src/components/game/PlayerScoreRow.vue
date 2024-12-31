<template>
  <div class="d-flex justify-space-between align-center w-100 py-2">
    <div class="d-flex align-center">
      <v-icon v-if="isLeader" color="accent" class="mr-2" icon="mdi-crown" />
      <span class="text-h6">{{ playerDetails.player.name }}</span>
    </div>
    <div class="d-flex align-center">
      <score-input
        :value="playerDetails.score"
        @update="updateScore"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapActions } from 'vuex'
import type { PlayerScore } from '../../types/game'
import ScoreInput from './ScoreInput.vue'

export default defineComponent({
  name: 'PlayerScoreRow',
  components: {
    ScoreInput
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
  methods: {
    ...mapActions('games', ['updatePlayerScore']),
    async updateScore(change: number) {
      const newScore = this.playerDetails.score + change
      if (newScore >= 0) {
        try {
          await this.updatePlayerScore(
            this.gameId,
            this.playerDetails.player.id,
            newScore
          )
        } catch (error) {
          console.error('Failed to update score:', error)
        }
      }
    }
  }
})
</script>