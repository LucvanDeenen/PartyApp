<template>
  <v-dialog :model-value="show" @update:model-value="$emit('close')" max-width="600px">
    <v-card>
      <v-img :src="game.imageUrl" height="200" cover></v-img>
      
      <v-card-title class="text-h5 pt-4">{{ game.title }}</v-card-title>
      
      <v-card-text>
        <v-list>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-account-group</v-icon>
            </template>
            <v-list-item-title>Players: {{ game.players.current }}/{{ game.players.max }}</v-list-item-title>
          </v-list-item>
          
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-account</v-icon>
            </template>
            <v-list-item-title>Host: {{ game.host }}</v-list-item-title>
          </v-list-item>
          
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-map</v-icon>
            </template>
            <v-list-item-title>Map: {{ game.map }}</v-list-item-title>
          </v-list-item>
        </v-list>
        
        <p class="mt-4">{{ game.description }}</p>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$emit('join', game)">Join Game</v-btn>
        <v-btn color="secondary" @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Game } from '../types/game'

defineProps<{
  show: boolean
  game: Game
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'join', game: Game): void
}>()
</script>