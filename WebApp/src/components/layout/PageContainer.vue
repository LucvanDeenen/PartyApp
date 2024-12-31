<template>
  <v-container fluid class="page-container pa-0">
    <slot name="header" />
    <div class="page-content" ref="content">
      <slot />
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageContainer',
  mounted() {
    this.$nextTick(() => {
      const content = this.$refs.content as HTMLElement
      if (content) {
        content.style.height = `${window.innerHeight - content.offsetTop}px`
      }
    })
  }
})
</script>

<style scoped>
.page-container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: var(--v-surface-variant);
  position: relative;
  overflow: hidden;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  position: relative;
}
</style>