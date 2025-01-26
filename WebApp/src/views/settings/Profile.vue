<template>
  <page-container>
    <div class="pa-4">
      <v-row>
        <v-col cols="12" md="6">
          <profile-info />
        </v-col>
        <v-col cols="12" md="6">
          <profile-settings />
        </v-col>
      </v-row>
    </div>
  </page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import ProfileSettings from '@/components/profile/ProfileSettings.vue'

export default defineComponent({
  name: 'Profile',
  components: {
    ProfileInfo,
    ProfileSettings
  }
})
</script>