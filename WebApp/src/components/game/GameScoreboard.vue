<template>
  <v-card>
    <v-card-title class="text-center text-h5 py-4">
      {{ title }}
    </v-card-title>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="playerDetails in sortedPlayers" :key="playerDetails.player.id"
        :class="{ 'first-place': playerDetails.score === highestScore }">
        <v-list-item-title>
          <v-icon v-if="playerDetails.score === highestScore" color="accent" class="mb-1" icon="mdi-crown"></v-icon>
          {{ playerDetails.player.name }}
        </v-list-item-title>

        <template v-slot:append>
          <div class="d-flex align-center">
            <v-icon color="accent" size="small" class="mr-1">
              mdi-star
            </v-icon>
            <span class="text-h6">{{ playerDetails.score }}</span>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { PlayerScore } from '../../types/game'

export default defineComponent({
  name: 'GameScoreboard',
  props: {
    title: {
      type: String,
      required: true
    },
    players: {
      type: Array as () => PlayerScore[],
      required: true
    }
  },
  computed: {
    sortedPlayers(): PlayerScore[] {
      return [...this.players].sort((a, b) => b.score - a.score)
    },

    highestScore(): number {
      return Math.max(...this.players.map(p => p.score))
    }
  },
  methods: {
    getInitials(name: string): string {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    }
  }
})
</script>


<style scoped>
.first-place {
  background-color: rgba(255, 193, 7, 0.1);
}

.position-relative {
  position: relative;
}
</style>