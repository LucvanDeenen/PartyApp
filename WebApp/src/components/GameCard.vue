<template>
  <v-card
    class="game-card"
    :elevation="2"
    @click="$emit('click')"
  >
    <v-img
      :src="game.imageUrl"
      height="200"
      cover
    ></v-img>
    
    <v-card-title>{{ game.title }}</v-card-title>
    
    <v-card-subtitle>{{ game.genre }}</v-card-subtitle>
    
    <v-card-text>{{ game.description }}</v-card-text>
    
    <v-card-actions>
      <v-btn
        color="primary"
        variant="tonal"
        block
      >
        Play Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Game } from '../types/game'

defineProps<{
  game: Game
}>()
</script>

<style scoped>
.game-card {
  transition: transform 0.2s;
}

.game-card:hover {
  transform: translateY(-4px);
}
</style>