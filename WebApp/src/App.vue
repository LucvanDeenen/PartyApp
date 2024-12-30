<template>
  <v-app>
    <navigation v-if="showNavigation" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from './components/layout/Navigation.vue'

export default defineComponent({
  name: 'AppRoot',
  components: {
    Navigation
  },
  computed: {
    showNavigation(): boolean {
      return !['login', 'register'].includes(this.$route.name as string)
    }
  }
})
</script>

<style lang="css">
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgb(25, 118, 210);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(0, 255, 255);
}
</style>