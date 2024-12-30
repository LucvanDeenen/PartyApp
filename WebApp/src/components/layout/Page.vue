<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { inject } from 'vue'

defineProps<{
  title: string
}>()

const app = inject<{ 
  updateSection: (section: string) => void,
  toggleNav?: () => void 
}>('app')
</script>

<template>
  <section class="w-full flex-shrink-0 h-screen overflow-y-auto">
    <div v-if="title" class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div class="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
        <div class="flex flex-col items-start gap-4">
          <h2 class="section-title">{{ title }}</h2>
          <div class="flex items-center gap-2">
            <div class="h-1 w-12 bg-black dark:bg-white rounded-full"></div>
            <div class="h-1 w-6 bg-black dark:bg-white rounded-full opacity-60"></div>
            <div class="h-1 w-3 bg-black dark:bg-white rounded-full opacity-30"></div>
          </div>
        </div>
        <!-- Mobile Nav Toggle -->
        <button 
          @click="app?.toggleNav?.()"
          class="lg:hidden p-2 bg-gray-100 dark:bg-gray-800 rounded-lg 
                hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
          <Bars3Icon class="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
      </div>
    </div>
    <div class="max-w-4xl mx-auto px-6 pb-24">
      <slot></slot>
    </div>
  </section>
</template>