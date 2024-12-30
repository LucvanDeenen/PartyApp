<template>
  <div class="game-row-wrapper">
    <v-hover v-slot="{ isHovering, props }">
      <v-row
        v-bind="props"
        :class="['game-row', { 'highlighted': isHovering }]"
        align="center"
        @click="$emit('click')"
      >
        <v-col cols="8">{{ game.title }}</v-col>
        <v-col cols="4" class="text-right d-flex align-center justify-end">
          <v-icon size="small" class="mr-1">mdi-account</v-icon>
          {{ game.players.current }}
        </v-col>
      </v-row>
    </v-hover>
  </div>
</template>

<script setup lang="ts">
import { Game } from '../types/game'

defineProps<{
  game: Game
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.game-row-wrapper {
  padding: 0.5rem 1rem;
}

.game-row {
  background-color: white;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  margin: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.highlighted {
  background-color: #f5f5f5;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>