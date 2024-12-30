<template>
  <div class="search-wrapper px-4 py-2">
    <v-text-field :model-value="searchQuery" prepend-inner-icon="mdi-magnify" placeholder="Search games..."
      variant="outlined" density="compact" hide-details class="search-field" bg-color="white"
      @update:model-value="onModelValueUpdate" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameSearch',
  emits: ['search'],
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    onModelValueUpdate(value: string) {
      this.searchQuery = value
      this.$emit('search', value)
    }
  }
})
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
