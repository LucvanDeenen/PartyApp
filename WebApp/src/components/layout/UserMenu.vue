<template>
  <v-list v-if="user">
    <v-list-item>
      <v-list-item-title class="text-body-2">
        {{ user.name }}
      </v-list-item-title>
      <v-list-item-subtitle class="text-caption">
        {{ user.email }}
      </v-list-item-subtitle>
      
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-logout"
          size="small"
          @click="logout"
        ></v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '../../stores/auth'

const router = useRouter()
const { user, logout: signOut } = useAuth()

const logout = async () => {
  await signOut()
  router.push('/login')
}
</script>