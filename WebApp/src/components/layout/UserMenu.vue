<template>
  <v-list v-if="currentUser">
    <v-list-item>
      <v-list-item-title class="text-body-2">
        {{ userName }}
      </v-list-item-title>
      <v-list-item-subtitle class="text-caption">
        {{ currentUser.email }}
      </v-list-item-subtitle>

      <template #append>
        <v-btn variant="text" icon="mdi-logout" size="small" @click="logout"></v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default defineComponent({
  name: 'UserMenu',
  computed: {
    ...mapGetters('auth', ['currentUser', 'userName'])
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