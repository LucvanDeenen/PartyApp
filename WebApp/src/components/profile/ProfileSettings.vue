<template>
  <v-card>
    <v-card-title class="text-h6">Settings</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="saveSettings">
        <v-switch v-model="settings.notifications" label="Enable notifications" color="primary" hide-details
          class="mb-4"></v-switch>

        <v-switch v-model="settings.soundEnabled" label="Enable sound effects" color="primary" hide-details
          class="mb-4"></v-switch>

        <v-select v-model="settings.theme" :items="themes" label="Theme" variant="outlined" density="comfortable"
          class="mb-4" @update:model-value="updateTheme"></v-select>

        <v-btn color="primary" type="submit" block>
          Save Settings
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'Settings',
  data() {
    return {
      themes: ['light', 'dark'],
      settings: {
        notifications: true,
        soundEnabled: true,
        theme: 'dark'
      }
    }
  },
  computed: {
    ...mapGetters('theme', ['currentTheme'])
  },
  created() {
    this.settings.theme = this.currentTheme
  },
  methods: {
    ...mapActions('theme', ['updateTheme']),
    saveSettings() {
      console.log('Saving settings:', this.settings)
    }
  }
})
</script>