<template>
  <div class="search-wrapper px-4 py-2">
    <v-text-field
      v-model="searchQuery"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search games..."
      variant="outlined"
      density="compact"
      hide-details
      class="search-field"
      @update:model-value="$emit('search', searchQuery)"
      bg-color="white"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

defineEmits<{
  (e: 'search', query: string): void
}>()
</script>

<style scoped>
.search-wrapper {
  background-color: #f8f9fa;
}

.search-field {
  max-width: 600px;
  margin: 0 auto;
}

:deep(.v-field) {
  border-radius: 12px !important;
}
</style>