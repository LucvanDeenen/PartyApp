<template>
  <v-navigation-drawer v-model="drawer" app :permanent="!$vuetify.display.mobile">
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

  <!-- Mobile Menu Button -->
  <v-btn
    icon
    class="menu-btn"
    @click="drawer = !drawer"
  >
    <v-icon>mdi-menu</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserMenu from './UserMenu.vue'

export default defineComponent({
  name: 'Navigation',
  components: {
    UserMenu,
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
  },
})
</script>

<style scoped>
.menu-btn {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 10;
  display: none;
}

@media (max-width: 600px) {
  .menu-btn {
    display: block;
  }
}
</style>
