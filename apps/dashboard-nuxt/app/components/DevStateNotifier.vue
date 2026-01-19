<script setup lang="ts">
import { Hammer } from 'lucide-vue-next'
import gsap from 'gsap'

const isHovered = ref(false)
const notifierRef = ref<HTMLElement | null>(null)
const iconRef = ref<HTMLElement | null>(null)

const onEnter = () => {
  isHovered.value = true
  gsap.to(notifierRef.value, {
    width: '200px',
    duration: 0.5,
    ease: 'power3.out'
  })
  gsap.to(iconRef.value, {
    rotate: 180,
    scale: 1.1,
    duration: 0.4,
    ease: 'back.out(2)'
  })
}

const onLeave = () => {
  isHovered.value = false
  gsap.to(notifierRef.value, {
    width: '48px',
    duration: 0.4,
    ease: 'power2.in'
  })
  gsap.to(iconRef.value, {
    rotate: 0,
    scale: 1,
    duration: 0.4,
    ease: 'power2.inOut'
  })
}

onMounted(() => {
  // Constant caution pulse
  gsap.to('.caution-glow', {
    opacity: 0.6,
    scale: 1.2,
    repeat: -1,
    yoyo: true,
    duration: 1,
    ease: 'sine.inOut'
  })
})
</script>

<template>
  <div 
    class="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div 
      ref="notifierRef"
      class="h-10 w-12 bg-[#FFD700] border-2 border-black rounded-full flex items-center overflow-hidden cursor-help shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
    >
      <!-- Icon Container -->
      <div 
        ref="iconRef"
        class="min-w-[44px] h-full flex items-center justify-center relative"
      >
        <div class="caution-glow absolute inset-1.5 rounded-full bg-black/10 opacity-0" />
        <Hammer :size="18" class="text-black relative z-10 stroke-[3px]" />
      </div>

      <!-- Text Container -->
      <div 
        class="whitespace-nowrap overflow-hidden transition-all duration-300 pr-6"
        :class="[isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none']"
      >
        <div class="flex flex-col">
          <span class="text-[8px] font-black text-black/40 uppercase tracking-[0.2em] leading-none mb-0.5">Alert Level 1</span>
          <span class="text-[10px] font-black text-black uppercase tracking-widest leading-none">Under Development</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-help {
  cursor: help;
}
</style>
