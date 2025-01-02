<template>
  <div class="game-row-wrapper">
    <v-hover v-slot="{ isHovering, props }">
      <v-card v-bind="props" :elevation="isHovering ? 2 : 1" class="game-row mx-2" @click="emitClick">
        <v-card-text class="d-flex justify-space-between align-center py-2">
          <div>{{ game.name }}</div>
          <div class="d-flex align-center">
            <v-icon size="small" class="mr-1">mdi-account</v-icon>
            {{ game.players.length }}
          </div>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Game } from '../../types/game'

export default defineComponent({
  name: 'GameRow',
  props: {
    game: {
      type: Object as () => Game,
      required: true
    }
  },
  emits: ['click'],
  methods: {
    emitClick() {
      this.$emit('click')
    }
  }
})
</script>

<style scoped>
.game-row {
  cursor: pointer;
  transition: all 0.2s ease;
}

.game-row:hover {
  transform: translateY(-1px);
}
</style>