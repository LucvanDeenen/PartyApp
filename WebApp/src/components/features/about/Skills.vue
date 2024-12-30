<script setup lang="ts">
interface SkillCategory {
  name: string
  skills: {
    name: string
    level: number
  }[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "Vue.js", level: 5 },
      { name: "React", level: 4 },
      { name: "TypeScript", level: 5 },
      { name: "Tailwind CSS", level: 4 }
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 5 },
      { name: "Python", level: 4 },
      { name: "PostgreSQL", level: 4 },
      { name: "GraphQL", level: 3 }
    ]
  },
  {
    name: "DevOps",
    skills: [
      { name: "Docker", level: 4 },
      { name: "AWS", level: 3 },
      { name: "CI/CD", level: 4 },
      { name: "Kubernetes", level: 3 }
    ]
  }
]
</script>

<template>
  <section>
    <h3 class="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">Technical Skills</h3>
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="category in skillCategories" 
           :key="category.name"
           class="project-card">
        <h4 class="text-lg font-medium mb-6 text-gray-800 dark:text-gray-200">{{ category.name }}</h4>
        <div class="space-y-4">
          <div v-for="skill in category.skills" 
               :key="skill.name"
               class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-700 dark:text-gray-300">{{ skill.name }}</span>
              <span class="text-gray-500 dark:text-gray-400">{{ skill.level }}/5</span>
            </div>
            <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-black dark:bg-white rounded-full transition-all duration-300"
                   :style="{ width: `${(skill.level / 5) * 100}%` }">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>