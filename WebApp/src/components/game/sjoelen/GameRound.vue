<template>
  <div class="round-display pa-4">
    <div class="d-flex align-center">
      <v-icon icon="mdi-flag-checkered" color="primary" class="mr-2" />
      <span class="text-h6">Round {{ round + 1 }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameRound',
  props: {
    round: {
      type: Number,
      required: true
    }
  }
})
</script>

<style scoped>
.round-display {
  background-color: var(--v-surface-bright);
  border-bottom: 1px solid var(--v-surface-variant);
}
</style>