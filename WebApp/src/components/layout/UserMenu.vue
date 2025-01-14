<template>
  <v-list v-if="user">
    <v-list-item>
      <v-list-item-title class="text-body-2">
        {{ user?.displayName }}
      </v-list-item-title>
      <v-list-item-subtitle class="text-caption">
        {{ user?.email ? user.email : 'Signed in as guest' }}
      </v-list-item-subtitle>

      <template #append>
        <v-btn variant="text" icon="mdi-logout" size="small" @click="logout"></v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { UserInfo } from 'firebase/auth';
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default defineComponent({
  name: 'UserMenu',
  computed: {
    ...mapGetters('auth', ['currentUser']),
    user(): UserInfo {
      return this.currentUser as UserInfo
    },
  },
  methods: {
    ...mapActions('auth', ['signOut']),
    async logout() {
      await this.signOut()
      this.$router.push('/login')
    }
  }
})
</script>