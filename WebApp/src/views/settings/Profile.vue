<template>
  <page-container>
    <template #header>
      <page-header title="Profile" icon="mdi-account" />
    </template>

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
import PageContainer from '@/components/layout/PageContainer.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import ProfileSettings from '@/components/profile/ProfileSettings.vue'

export default defineComponent({
  name: 'Profile',
  components: {
    PageContainer,
    PageHeader,
    ProfileInfo,
    ProfileSettings
  }
})
</script>