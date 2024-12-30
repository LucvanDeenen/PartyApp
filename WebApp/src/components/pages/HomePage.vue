<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted } from 'vue';

const app: any = inject('app');

const textArray: Array<String> = ["Dedeen"];
const letters: String = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const textIndex = ref(0);

let interval: ReturnType<typeof setInterval> | null = null;
let animation: ReturnType<typeof setInterval> | null = null;

const navigateToPage = () => {
  app?.updateSection('about');
};

const animateText = (title: HTMLElement) => {
  let iteration = 0;

  if (!title) return;

  animation = setInterval(() => {
    title.innerText = title.innerText.split("")
      .map((letter, index) => {
        if (index < iteration) return textArray[textIndex.value][index];
        if (letter === " " || letter === "_" || letter === ".") return letter;
        return letters[Math.floor(Math.random() * letters.length)];
      }).join("");

    if (iteration > textArray[textIndex.value].length) clearInterval(animation!);
    iteration += 1 / 3;
  }, 50);
};

onMounted(() => {
  const title = document.getElementById("title");
  animateText(title!);
  interval = setInterval(() => {
    textIndex.value = (textIndex.value + 1) % textArray.length;
    animateText(title!);
  }, 10000);

});

onUnmounted(() => {
  if (interval) clearInterval(interval);
  if (animation) clearInterval(animation);
});
</script>

<template>
  <section class="w-full flex-shrink-0 h-screen overflow-y-auto">
    <div class="flex flex-col items-center justify-center h-full text-center px-4">
      <div class="flex flex-col items-center">
        <h1
          class="text-6xl font-bold bg-gradient-to-r uppercase from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Welcome to
        </h1>
        <h1 id="title"
          class="text-6xl font-bold bg-gradient-to-r uppercase from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          {{ textArray[textIndex] }}
        </h1>
      </div>

      <p class="text-xl mt-12 text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
        A passionate software engineer.
      </p>

      <button @click="navigateToPage" class="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg 
                 transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                 font-medium text-lg">
        View My Work
      </button>
    </div>
  </section>
</template>