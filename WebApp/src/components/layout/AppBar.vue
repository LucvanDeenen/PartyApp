<template>
  <v-app-bar v-if="user">
    <div class="d-flex align-center px-4 w-100">
      <span class="text-h6">🎉 Party App</span>
      <v-spacer></v-spacer>
      <user-menu />
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import UserMenu from './UserMenu.vue'
import { useAuth } from '../../stores/auth'

const { user } = useAuth()
</script>