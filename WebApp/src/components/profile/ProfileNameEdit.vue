<template>
  <v-dialog v-model="dialog" max-width="400px">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        density="comfortable"
        icon="mdi-pencil"
        size="small"
      ></v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h6 pa-4">
        Edit Profile Name
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="newName"
            label="Name"
            :rules="[v => !!v || 'Name is required']"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="handleSubmit"
          :loading="loading"
          :disabled="!newName"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useAuth } from '../../services/auth'

export default {
  name: 'EditProfileName',
  data() {
    const { user } = useAuth()

    return {
      dialog: false,
      newName: user?.value?.name || '',
      loading: false,
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.newName) return

      const { updateProfileName } = useAuth()

      try {
        this.loading = true
        await updateProfileName(this.newName)
        this.dialog = false
      } catch (error) {
        console.error('Failed to update name:', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
