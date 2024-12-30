<script setup lang="ts">
import Page from '../layout/Page.vue'
import Skills from '../features/about/Skills.vue'
import Education from '../features/about/Education.vue'
import Bio from '../features/about/Bio.vue'
</script>

<template>
  <Page title="About Me">
    <div class="space-y-24">
      <Bio />
      <Skills />
      <Education />
    </div>
  </Page>
</template>