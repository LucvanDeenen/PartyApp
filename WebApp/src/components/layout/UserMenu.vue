<template>
  <v-list v-if="user">
    <v-list-item>
      <v-list-item-title class="text-body-2">
        {{ user.name }}
      </v-list-item-title>
      <v-list-item-subtitle class="text-caption">
        {{ user.email }}
      </v-list-item-subtitle>

      <template #append>
        <v-btn variant="text" icon="mdi-logout" size="small" @click="logout"></v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { signOutUser } from '../../services/auth'

export default defineComponent({
  name: 'UserMenu',
  data() {
    return {
      user: null as any,
    }
  },
  methods: {
    async logout() {
      await signOutUser()
      this.$router.push('/login')
    }
  }
})
</script>
