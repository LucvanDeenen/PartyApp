<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-row
      v-bind="props"
      :class="['game-row py-2 px-4', { 'highlighted': isHovering }]"
      align="center"
    >
      <v-col cols="4" class="d-flex align-center">
        <v-avatar size="32" class="mr-3">
          <v-img :src="game.imageUrl" cover></v-img>
        </v-avatar>
        <div>
          <div class="text-body-1">{{ game.title }}</div>
          <div class="text-caption text-medium-emphasis">Hosted by {{ game.host }}</div>
        </div>
      </v-col>
      
      <v-col cols="2">
        <v-chip
          :color="getStatusColor(game.status)"
          size="small"
          class="mr-2"
        >
          {{ game.status }}
        </v-chip>
        {{ game.players.current }}/{{ game.players.max }}
      </v-col>
      
      <v-col cols="2">{{ game.map }}</v-col>
      
      <v-col cols="2">
        <v-chip
          :color="getPingColor(game.ping)"
          size="small"
        >
          {{ game.ping }}ms
        </v-chip>
      </v-col>
      
      <v-col cols="2">
        <v-btn
          color="primary"
          variant="tonal"
          size="small"
          :disabled="game.status === 'full'"
          @click="$emit('join', game)"
        >
          {{ game.status === 'full' ? 'Full' : 'Join' }}
        </v-btn>
      </v-col>
    </v-row>
  </v-hover>
</template>

<script setup lang="ts">
import { Game } from '../types/game'

defineProps<{
  game: Game
}>()

defineEmits<{
  (e: 'join', game: Game): void
}>()

const getStatusColor = (status: Game['status']) => {
  switch (status) {
    case 'active': return 'success'
    case 'waiting': return 'warning'
    case 'full': return 'error'
    default: return 'default'
  }
}

const getPingColor = (ping: number) => {
  if (ping < 50) return 'success'
  if (ping < 100) return 'warning'
  return 'error'
}
</script>

<style scoped>
.game-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  transition: background-color 0.2s;
}

.highlighted {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>