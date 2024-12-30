<template>
  <div class="game-row-wrapper">
    <v-hover v-slot="{ isHovering, props }">
      <v-row v-bind="props" :class="['game-row', { 'highlighted': isHovering }]" @click="emitClick">
        <v-col cols="8">{{ game.name }}</v-col>
        <v-col cols="4" class="text-right d-flex align-center justify-end">
          <v-icon size="small" class="mr-1">mdi-account</v-icon>
          {{ game.players.length }}
        </v-col>
      </v-row>
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
  padding: 8px;
}

.game-row.highlighted {
  background-color: #f3f3f3;
}
</style>
