<template>
  <transition name="page" mode="out-in" @before-enter="beforeEnter" @enter="enter" @leave="leave"
    @after-leave="afterLeave">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageTransition',
  methods: {
    beforeEnter(el: Element) {
      requestAnimationFrame(() => {
        (el as HTMLElement).style.opacity = '0'
          ; (el as HTMLElement).style.transform = 'translateY(30px) scale(0.98)'
      })
    },
    enter(el: Element, done: () => void) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          (el as HTMLElement).style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
            ; (el as HTMLElement).style.opacity = '1'
            ; (el as HTMLElement).style.transform = 'translateY(0) scale(1)'
          el.addEventListener('transitionend', done, { once: true })
        })
      })
    },
    leave(el: Element, done: () => void) {
      requestAnimationFrame(() => {
        (el as HTMLElement).style.transition = 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)'
          ; (el as HTMLElement).style.opacity = '0'
          ; (el as HTMLElement).style.transform = 'translateY(-30px) scale(0.98)'
        el.addEventListener('transitionend', done, { once: true })
      })
    },
    afterLeave(el: Element) {
      ;(el as HTMLElement).style.transition = ''
      ;(el as HTMLElement).style.transform = ''
    }
  }
})
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 1.6s cubic-bezier(0.23, 1, 0.32, 1);
  position: absolute;
  width: 100%;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}
</style>