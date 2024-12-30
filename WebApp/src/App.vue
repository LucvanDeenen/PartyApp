<script setup lang="ts">
import { ref, provide } from 'vue'
import Navigation from './components/layout/Navigation.vue'
import HomePage from './components/pages/HomePage.vue'
import ExperiencePage from './components/pages/ExperiencePage.vue'
import AboutPage from './components/pages/AboutPage.vue'
import ContactPage from './components/pages/ContactPage.vue'

const activeSection = ref('home')
const isNavOpen = ref(false)

const updateSection = (sectionId: string) => {
  activeSection.value = sectionId
  if (sectionId === 'home') {
    isNavOpen.value = false
  }
}

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

provide('app', { updateSection, toggleNav })
</script>

<template>
  <div class="flex min-h-[100dvh] bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Navigation with transitions -->
    <div class="fixed left-0 top-0 h-[100dvh] lg:w-[30%] z-[51] transition-transform duration-500" :class="[
      activeSection === 'home' ? '-translate-x-full' : 'lg:translate-x-0',
      { '-translate-x-full': !isNavOpen && activeSection !== 'home' }
    ]">
      <Navigation @close="isNavOpen = false" />
    </div>

    <!-- Main Content -->
    <div :class="{
      'lg:ml-[30%] lg:w-[70%]': activeSection !== 'home',
      'w-full': activeSection === 'home'
    }" class="overflow-x-hidden transition-all duration-500 min-w-[300px]">
      <div class="flex transition-transform duration-500"
        :style="{ transform: `translateX(-${activeSection === 'home' ? 0 : activeSection === 'about' ? 100 : activeSection === 'experience' ? 200 : 300}%)` }">
        <div class="w-full flex-shrink-0">
          <HomePage />
        </div>
        <div class="w-full flex-shrink-0">
          <AboutPage />
        </div>
        <div class="w-full flex-shrink-0">
          <ExperiencePage />
        </div>
        <div class="w-full flex-shrink-0">
          <ContactPage />
        </div>
      </div>
    </div>

    <!-- Overlay for mobile nav -->
    <div v-if="isNavOpen && activeSection !== 'home'" class="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-50"
      @click="isNavOpen = false">
    </div>
  </div>
</template>

<style>
.ml-\[30\%\] {
  margin-left: 30%;
}
</style>