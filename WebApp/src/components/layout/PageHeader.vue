<template>
  <v-card flat color="surface-variant" class="header-card">
    <v-container class="px-4 py-3">
      <v-row align="center" no-gutters>
        <v-col>
          <div class="d-flex align-center">
            <template v-if="showBack">
              <v-btn icon="mdi-arrow-left" variant="text" @click="$emit('back')" class="mr-3" />
            </template>
            <v-icon :icon="icon" size="large" class="mr-3" color="primary" />
            <h2 class="text-h5 font-weight-bold mb-0">{{ title }}</h2>
          </div>
        </v-col>
        <v-col v-if="$slots.actions" cols="auto">
          <slot name="actions" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  emits: ['back']
})
</script>

<style scoped>
.header-card {
  border-bottom: 1px solid var(--v-surface-bright);
}
</style>