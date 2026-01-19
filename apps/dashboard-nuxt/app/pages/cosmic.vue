<script setup lang="ts">
import { Moon, Sun, Star, Clock, Calendar, ArrowRight } from 'lucide-vue-next'
import gsap from 'gsap'

onMounted(() => {
  gsap.to('.celestial-glow', {
    opacity: 0.3,
    scale: 1.2,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
})
</script>

<template>
  <div class="py-6 space-y-12">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10 group overflow-hidden">
      <div>
        <h2 class="text-[13px] font-semibold text-perplexity-text-muted">Core chronos alignment</h2>
        <h1 class="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none font-sans">Cosmic Scheduler</h1>
      </div>
      <div class="flex gap-4">
        <button class="px-8 py-3 bg-white/[0.03] border border-white/10 text-white/40 rounded font-mono font-bold text-[10px] uppercase tracking-widest hover:text-white transition-all">
          HISTORY_ARCHIVE
        </button>
        <button class="px-8 py-3 bg-white text-black rounded-full font-semibold text-[13px] hover:bg-white/90 transition-all active:scale-95 shadow-glow-white/10">
          NEW_EVENT_SIGNAL
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Calendar Panel: Technical Box -->
      <div class="lg:col-span-2 stack-trace-box p-8 flex flex-col h-[600px] overflow-hidden">
        <div class="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
          <div class="flex items-center gap-6">
            <h3 class="text-2xl font-bold text-white tracking-tight font-sans">January 2026</h3>
            <div class="flex items-center gap-2">
              <button class="p-2 bg-white/[0.03] border border-white/[0.1] text-white/20 hover:text-white transition-all rounded"><ArrowRight class="rotate-180" :size="14" /></button>
              <button class="p-2 bg-white/[0.03] border border-white/[0.1] text-white/20 hover:text-white transition-all rounded"><ArrowRight :size="14" /></button>
            </div>
          </div>
          <div class="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.1] rounded-full text-[11px] font-semibold text-perplexity-text-muted font-sans">
            <Calendar :size="12" /> View mode: month
          </div>
        </div>
        
        <div class="flex-1 grid grid-cols-7 gap-2">
          <div v-for="d in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="d" class="text-center text-[11px] font-semibold text-white/20 font-sans mb-4">
            {{ d }}
          </div>
          <div v-for="i in 31" :key="i" 
            class="aspect-square flex flex-col items-center justify-center text-[13px] font-semibold font-sans transition-all border border-transparent"
            :class="[
              i === 19 ? 'bg-white text-black' : i % 7 === 0 ? 'text-white/10' : 'text-white/40 hover:bg-white/[0.05] hover:border-white/10 cursor-pointer'
            ]"
          >
            <span class="opacity-50 select-none text-[8px] mb-1">{{ i < 10 ? '0' + i : i }}</span>
            <div v-if="i === 19" class="w-1 h-1 bg-black rounded-full mt-1" />
          </div>
        </div>
      </div>

      <!-- Alignment Info -->
      <div class="space-y-8">
        <PremiumCard
          title="14:20 - 15:45"
          subtitle="Sun"
          description="Next Peak Human Attention Window"
          :icon="Sun"
          icon-gradient="from-yellow-500 to-orange-500"
          status="Active"
          status-color="green"
          action-label="Auspicious Window Active"
          @action="() => {}"
        />

        <PremiumCard
          title="Waxing"
          subtitle="Moon"
          description="Current Cycle Efficiency Alignment"
          :icon="Moon"
          icon-gradient="from-blue-500 to-indigo-500"
          status="Current Phase"
          status-color="indigo"
          action-label="View lunar logs"
          @action="() => {}"
        >
          <div class="flex justify-center py-4">
            <div class="w-12 h-12 rounded-full border-4 border-white border-r-transparent animate-spin-slow" />
          </div>
        </PremiumCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}
</style>
