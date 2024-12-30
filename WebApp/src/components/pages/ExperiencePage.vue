<script setup lang="ts">
import Page from '../layout/Page.vue'
import WorkHistory from '../features/experience/WorkHistory.vue'
import PersonalProjects from '../features/experience/PersonalProjects.vue'
</script>

<template>
  <Page title="Experience">
    <div class="space-y-24">
      <WorkHistory />
      <PersonalProjects />
    </div>
  </Page>
</template>