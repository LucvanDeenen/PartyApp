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
        <v-btn
          color="grey-darken-1"
          variant="text"
          @click="dialog = false"
        >
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

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../../stores/auth'

const { user, updateProfileName } = useAuth()
const dialog = ref(false)
const newName = ref(user.value?.name || '')
const loading = ref(false)

const handleSubmit = async () => {
  if (!newName.value) return
  
  try {
    loading.value = true
    await updateProfileName(newName.value)
    dialog.value = false
  } catch (error) {
    console.error('Failed to update name:', error)
  } finally {
    loading.value = false
  }
}
</script>