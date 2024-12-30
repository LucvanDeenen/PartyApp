<template>
  <v-app>
    <navigation v-if="showNavigation" />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from './components/layout/Navigation.vue'
import { createAuth } from './stores/auth'

// Initialize auth store at the root level
createAuth()

const route = useRoute()

const showNavigation = computed(() => {
  return !['login', 'register'].includes(route.name as string)
})
</script>