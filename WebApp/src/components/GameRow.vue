<template>
  <div class="game-row-wrapper">
    <v-hover v-slot="{ isHovering, props }">
      <v-row
        v-bind="props"
        :class="['game-row', { 'highlighted': isHovering }]"
        align="center"
        @click="$emit('click')"
      >
        <v-col cols="8">{{ game.name }}</v-col>
        <v-col cols="4" class="text-right d-flex align-center justify-end">
          <v-icon size="small" class="mr-1">mdi-account</v-icon>
          {{ game.players.length }}
        </v-col>
      </v-row>
    </v-hover>
  </div>
</template>

<script setup lang="ts">
import type { Game } from '../types/game'

defineProps<{
  game: Game
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>