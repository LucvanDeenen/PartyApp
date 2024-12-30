<script setup lang="ts">
interface Education {
  school: string
  degree: string
  period: string
  description: string
  achievements: string[]
}

const education: Education[] = [
  {
    school: "ZUYD University of Applied Sciences",
    degree: "Bachelor of Science",
    period: "2017 - 2021",
    description: "Specialized in Software Development with a focus on solution-driven design, research-based decision-making, and process-centered methodologies.",
    achievements: [
      "Developed a POC Mobile App for the bycicle event \"Limburgs Mooiste\".",
      "Developed a Language Processor that uses a dataset of books to guess the language the user is prompting it.",
      "Created the game TicTacToe where the user can play against an AI, based on the MiniMax algorithms"
    ]
  }
]
</script>

<template>
  <section>
    <h3 class="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">Education</h3>
    <div class="space-y-6">
      <div v-for="edu in education" :key="edu.school">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h4 class="text-xl font-semibold text-gray-900 dark:text-white">{{ edu.school }}</h4>
            <p class="text-gray-600 dark:text-gray-400">{{ edu.degree }}</p>
          </div>
          <span class="text-gray-500 dark:text-gray-400">{{ edu.period }}</span>
        </div>
        <p class="text-gray-700 dark:text-gray-300 mb-4">{{ edu.description }}</p>
        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li v-for="achievement in edu.achievements" :key="achievement">
            {{ achievement }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>