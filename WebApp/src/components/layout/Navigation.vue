<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item class="px-4 py-4">
        <span class="text-h6">🎉 Party App</span>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item to="/games" prepend-icon="mdi-gamepad-variant">
        Games
      </v-list-item>

      <v-list-item to="/profile" prepend-icon="mdi-account">
        Profile
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-divider></v-divider>
      <user-menu />
    </template>

  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserMenu from './UserMenu.vue'

export default defineComponent({
  name: 'Navigation',
  components: {
    UserMenu
  }
})
</script>