<template>
  <v-container class="profile-container pa-6">
    <h1 class="text-h4 mb-6">Profile</h1>
    <v-row>
      <v-col cols="12" md="6">
        <profile-info />
      </v-col>
      <v-col cols="12" md="6">
        <profile-settings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ProfileInfo from '../components/profile/ProfileInfo.vue'
import ProfileSettings from '../components/profile/ProfileSettings.vue'
</script>