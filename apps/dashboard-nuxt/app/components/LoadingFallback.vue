<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100] gap-12 overflow-hidden">
    <!-- Premium Background Glows -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/[0.03] blur-[150px] rounded-full animate-pulse" />
      <div class="absolute -top-[10%] -right-[10%] w-[400px] h-[400px] bg-indigo-500/[0.03] blur-[150px] rounded-full" />
    </div>

    <div class="relative group">
      <!-- High-End Spinner -->
      <div class="relative w-32 h-32 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center shadow-2xl overflow-hidden backdrop-blur-3xl">
        <div class="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent" />
        <Loader2 :size="48" class="text-white animate-spin-slow opacity-40" />
        
        <!-- Animated Scanner Effect -->
        <div class="absolute top-0 left-0 w-full h-[2px] bg-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-scan" />
      </div>

      <!-- Corner Highlights -->
      <div class="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-green-500/20" />
      <div class="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-green-500/20" />
    </div>

    <div class="space-y-4 text-center relative z-10">
      <div class="flex items-center justify-center gap-3 mb-2">
        <div class="status-pulse">
          <div class="status-pulse-inner" />
        </div>
        <span class="text-[11px] font-semibold text-green-500/60 tracking-wider">System authorization</span>
      </div>
      <h3 class="text-4xl font-bold text-white tracking-tighter">{{ text || 'Synchronizing Operations' }}</h3>
      <p class="text-[11px] font-medium text-perplexity-text-muted tracking-wide font-sans">Sovereign encryption protocols active</p>
    </div>

    <!-- Data Matrix Stream Placeholder -->
    <div class="absolute bottom-12 left-12 right-12 flex justify-between items-end opacity-20">
      <div class="space-y-1">
        <div v-for="i in 3" :key="i" class="h-1 bg-white/10 rounded-full" :style="{ width: 40 + (i * 20) + 'px' }" />
      </div>
      <div class="text-[11px] font-medium text-perplexity-text-muted tracking-wide font-sans">
        Verifying node integrity...
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes scan {
  0% { transform: translateY(-32px); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(128px); opacity: 0; }
}
.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
.animate-scan {
  animation: scan 4s ease-in-out infinite;
}
</style>
