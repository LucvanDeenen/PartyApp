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
          class="mb-4"></v-select>

        <v-btn color="primary" type="submit" block>
          Save Settings
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'Settings',
  data() {
    return {
      themes: ['Light', 'Dark', 'System'],
      settings: {
        notifications: true,
        soundEnabled: true,
        theme: 'Light',
      },
    }
  },
  methods: {
    saveSettings() {
      console.log('Saving settings:', this.settings)
    },
  },
}
</script>
