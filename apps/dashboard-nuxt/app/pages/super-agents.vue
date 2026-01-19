<script setup lang="ts">
import { UserPlus, Brain, Shield, Zap, Terminal, Activity } from 'lucide-vue-next'
import gsap from 'gsap'

const agents = [
  { name: 'Aurelius-Alpha', role: 'Sentiment Lead', status: 'Active', power: 92 },
  { name: 'Zenith-Prime', role: 'Support Agent', status: 'Learning', power: 45 },
  { name: 'Chronos-I', role: 'Scheduler Agent', status: 'Standby', power: 0 },
]

onMounted(() => {
  gsap.from('.agent-header', { y: -10, opacity: 0, duration: 0.6, ease: 'expo.out' })
  gsap.from('.agent-card', { y: 15, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 })
})
</script>

<template>
  <div class="py-8 space-y-16">
    <header class="agent-header flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-perplexity-border pb-12 group">
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
          <h2 class="text-[13px] font-semibold text-perplexity-text-muted">Cognitive logic units</h2>
        </div>
        <h1 class="text-6xl font-bold text-white tracking-tight leading-none">AI <span class="text-white/20">SuperAgents</span></h1>
      </div>
      <button class="px-8 py-3.5 bg-white text-black rounded-full font-semibold text-[13px] hover:bg-white/90 transition-all flex items-center gap-3 active:scale-95 shadow-glow-white/10">
        <UserPlus :size="16" /> Deploy Neural Unit
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <PremiumCard
        v-for="agent in agents"
        :key="agent.name"
        :title="agent.name"
        :subtitle="agent.role"
        :icon="Brain"
        :status="agent.status"
        :status-color="agent.status === 'Active' ? 'green' : (agent.status === 'Learning' ? 'yellow' : 'white')"
        :stats="[
          { label: 'Neural Power', value: agent.power + '%' }
        ]"
        action-label="Manage Consciousness"
        @action="() => {}"
      />
    </div>

    <!-- Agent Logs: Technical Box (Minimal) -->
    <div class="bg-perplexity-surface/40 border border-perplexity-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/10">
      <div class="px-6 py-4 border-b border-perplexity-border bg-white/[0.01] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Brain :size="16" class="text-perplexity-text-muted" />
          <span class="text-[13px] font-semibold text-perplexity-text-muted">Cognition stream</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span class="text-[11px] text-green-500/80 font-medium tracking-wide">Stream active</span>
        </div>
      </div>
      <div class="p-8 font-mono text-[12px] space-y-3 overflow-y-auto max-h-64 scrollbar-minimal">
        <div class="flex gap-4"><span class="text-white/10 select-none w-4">01</span> <span class="text-perplexity-text-muted/60">[COGNITIVE]</span> <span class="text-white/60">Aurelius-Alpha analyzing user sentiment on post ID: 1942LLC</span></div>
        <div class="flex gap-4"><span class="text-white/10 select-none w-4">02</span> <span class="text-perplexity-text-muted/60">[ACTION]</span> <span class="text-white/40">Adjusting response vector to: Professional + Enthusiastic</span></div>
        <div class="flex gap-4"><span class="text-white/10 select-none w-4">03</span> <span class="text-perplexity-text-muted/60">[LOGIC]</span> <span class="text-green-500/40 font-bold">Inference valid. Accuracy: 99.4%. Latency: 42ms.</span></div>
        <div class="flex gap-4"><span class="text-white/10 select-none w-4">04</span> <span class="text-perplexity-text-muted/60">[SYSTEM]</span> <span class="text-white/20 italic">Ready for next neural batch. Synchronizing consciousness...</span></div>
      </div>
    </div>
  </div>
</template>
