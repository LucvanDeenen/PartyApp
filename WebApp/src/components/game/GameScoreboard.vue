<template>
  <v-card class="scoreboard">
    <v-card-title class="text-center text-h5 py-4">
      {{ title }}
    </v-card-title>
    
    <v-divider></v-divider>
    
    <v-list>
      <v-list-item
        v-for="player in sortedPlayers"
        :key="player.id"
        :class="{ 'first-place': player.points === highestScore }"
      >
        <template v-slot:prepend>
          <v-avatar
            :color="player.points === highestScore ? 'warning' : 'primary'"
            :image="player.avatar"
            class="position-relative"
          >
            {{ getInitials(player.name) }}
          </v-avatar>
        </template>
        
        <v-list-item-title>
            {{ player.name }}
            <v-icon
              v-if="player.points === highestScore"
              color="warning"
              class="mb-1"
              icon="mdi-crown"
            ></v-icon>
        </v-list-item-title>
        
        <template v-slot:append>
          <div class="d-flex align-center">
            <v-icon
              color="amber"
              size="small"
              class="mr-1"
            >
              mdi-star
            </v-icon>
            <span class="text-h6">{{ player.points }}</span>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Player } from '../../types/game'

const props = defineProps<{
  title: string
  players: Player[]
}>()

const sortedPlayers = computed(() => {
  return [...props.players].sort((a, b) => b.points - a.points)
})

const highestScore = computed(() => {
  return Math.max(...props.players.map(p => p.points))
})

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}
</script>

<style scoped>
.first-place {
  background-color: rgba(255, 193, 7, 0.1);
}

.position-relative {
  position: relative;
}
</style>