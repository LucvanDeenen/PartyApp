<script setup lang="ts">
import Timeline from '../../shared/Timeline.vue'

const projects: any = []

// const projects = [
//   {
//     title: "AI Code Assistant",
//     subtitle: "Machine Learning Project",
//     description: [
//       "An AI-powered code completion and suggestion tool built with machine learning",
//       "Implemented advanced NLP algorithms",
//       "Achieved 90% accuracy in code suggestions"
//     ],
//     technologies: ["Python", "TensorFlow", "React"],
//     links: {
//       github: "https://github.com/yourusername/ai-code-assistant",
//       demo: "https://ai-code.demo.com"
//     }
//   },
//   {
//     title: "Portfolio Website",
//     subtitle: "Personal Website",
//     description: [
//       "A responsive portfolio website built with Vue 3 and Tailwind CSS",
//       "Implemented dark mode and smooth animations",
//       "Optimized for performance and accessibility"
//     ],
//     technologies: ["Vue 3", "TypeScript", "Tailwind CSS"],
//     links: {
//       github: "https://github.com/yourusername/portfolio",
//       demo: "https://portfolio.yourdomain.com"
//     }
//   }
// ]
</script>

<template>
  <Timeline id="projects" title="Personal Projects" :items="projects" />
</template>