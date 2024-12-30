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
import { useAuth } from '../../services/auth'

export default defineComponent({
  name: 'UserMenu',
  data() {
    return {
      user: null as any,
      signOut: null as (() => Promise<void>) | null,
    }
  },
  created() {
    const { user, logout } = useAuth()
    this.user = user
    this.signOut = logout
  },
  methods: {
    async logout() {
      if (!this.signOut) return
      await this.signOut()
      this.$router.push('/login')
    }
  }
})
</script>
