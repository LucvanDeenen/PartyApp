<template>
  <v-dialog :model-value="show" @update:model-value="$emit('update:show', $event)" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h6 pa-4">
        Choose Your Guest Name
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="guestName"
            label="Display Name"
            :rules="nameRules"
            variant="outlined"
            density="comfortable"
            :error-messages="errorMessage"
            @update:model-value="errorMessage = ''"
            autofocus
          ></v-text-field>

          <div class="text-caption text-medium-emphasis mt-2">
            Name requirements:
            <ul class="mt-1">
              <li>3-20 characters long</li>
              <li>Letters, numbers, and spaces only</li>
              <li>Must be family-friendly</li>
            </ul>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey-darken-1"
          variant="text"
          @click="$emit('update:show', false)"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="handleSubmit"
          :loading="loading"
          :disabled="!isValidName"
        >
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', name: string): void
  (e: 'update:show', value: boolean): void
}>()

const guestName = ref('')
const loading = ref(false)
const errorMessage = ref('')

const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => v.length >= 3 || 'Name must be at least 3 characters',
  (v: string) => v.length <= 20 || 'Name must be less than 20 characters',
  (v: string) => /^[a-zA-Z0-9 ]*$/.test(v) || 'Only letters, numbers, and spaces allowed'
]

const isValidName = computed(() => {
  return guestName.value.length >= 3 && 
         guestName.value.length <= 20 && 
         /^[a-zA-Z0-9 ]*$/.test(guestName.value)
})

const handleSubmit = async () => {
  if (!isValidName.value) return
  
  try {
    loading.value = true
    emit('submit', guestName.value.trim())
  } finally {
    loading.value = false
  }
}
</script>