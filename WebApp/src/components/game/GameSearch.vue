<template>
  <div class="search-wrapper px-4 py-2">
    <v-card flat color="surface-variant">
      <v-container class="px-2">
        <v-text-field :model-value="searchQuery" prepend-inner-icon="mdi-magnify" placeholder="Search games..."
          variant="outlined" density="compact" hide-details bg-color="surface"
          @update:model-value="onModelValueUpdate" />
      </v-container>
    </v-card>
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
  background-color: var(--v-surface-variant);
}

:deep(.v-field) {
  border-radius: 12px !important;
}
</style>