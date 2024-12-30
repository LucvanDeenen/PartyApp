<script setup lang="ts">
import Timeline from '../../shared/Timeline.vue'

const workHistory: any = []

// const workHistory = [
//   {
//     title: "Tech Company A",
//     subtitle: "Senior Software Engineer",
//     period: "2022 - Present",
//     description: [
//       "Led development of core platform features",
//       "Managed team of 5 developers",
//       "Improved system performance by 40%"
//     ],
//     technologies: ["Vue", "TypeScript", "Node.js"]
//   },
//   {
//     title: "Tech Company B",
//     subtitle: "Full Stack Developer",
//     period: "2020 - 2022",
//     description: [
//       "Developed and maintained multiple client applications",
//       "Implemented CI/CD pipelines",
//       "Reduced deployment time by 60%"
//     ],
//     technologies: ["React", "Python", "AWS"]
//   }
// ]
</script>

<template>
  <Timeline id="work" title="Work History" :items="workHistory" />
</template>