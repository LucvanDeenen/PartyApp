<template>
  <div class="d-flex align-center">
    <v-btn
      icon="mdi-minus"
      variant="text"
      density="comfortable"
      @click="$emit('update', -1)"
    />
    <v-text-field
      :model-value="value"
      type="number"
      variant="outlined"
      density="compact"
      hide-details
      class="score-input mx-2"
      @update:model-value="handleInput"
    />
    <v-btn
      icon="mdi-plus"
      variant="text"
      density="comfortable"
      @click="$emit('update', 1)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScoreInput',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  emits: ['update'],
  methods: {
    handleInput(value: string) {
      const numValue = parseInt(value)
      if (!isNaN(numValue)) {
        this.$emit('update', numValue - this.value)
      }
    }
  }
})
</script>

<style scoped>
.score-input {
  width: 80px;
}

:deep(.v-field) {
  border-radius: 8px !important;
}
</style>