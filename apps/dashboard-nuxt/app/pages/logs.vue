<script setup lang="ts">
import { History, Search, Filter, Download, Terminal, ChevronRight } from 'lucide-vue-next'
import gsap from 'gsap'

const logs = [
  { time: '14:20:01', event: 'AUTH_SUCCESS', agent: 'Aurelius', status: 'OK' },
  { time: '14:22:15', event: 'CONTENT_GEN', agent: 'Zenith', status: 'WARN' },
  { time: '14:25:32', event: 'NOTION_SYNC', agent: 'System', status: 'OK' },
  { time: '14:28:44', event: 'DM_SENT', agent: 'Aurelius', status: 'OK' },
  { time: '14:30:11', event: 'META_WEBHOOK', agent: 'Gateway', status: 'OK' },
]

onMounted(() => {
  gsap.from('.log-row', {
    x: -10,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: 'power2.out'
  })
})
</script>

<template>
  <div class="py-6 space-y-12">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10 group">
      <div>
        <h2 class="text-[13px] font-semibold text-perplexity-text-muted">Core auditor trace</h2>
        <h1 class="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none font-sans">Audit Trail</h1>
      </div>
      <div class="flex gap-4">
        <button class="p-3 bg-white/[0.03] border border-white/[0.1] text-white/40 hover:text-white rounded transition-all">
          <Download :size="16" />
        </button>
        <div class="relative group">
          <input 
            type="text" 
            placeholder="FILTER_TRACE..." 
            class="bg-white/[0.03] border border-white/10 rounded-full px-12 py-3 text-[13px] font-medium text-white focus:outline-none focus:border-green-500/30 transition-all w-64"
          >
          <Search :size="14" class="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-green-500 transition-colors" />
        </div>
      </div>
    </header>

    <div class="stack-trace-box overflow-hidden">
      <div class="stack-trace-header border-b border-white/5">
        <div class="flex items-center gap-12 text-[11px] font-medium text-perplexity-text-muted">
          <span class="w-24">Timestamp</span>
          <span class="w-40">Event identifier</span>
          <span class="w-32">Executor</span>
          <span>Integrity</span>
        </div>
        <button class="flex items-center gap-2 text-[11px] font-semibold text-perplexity-text-muted hover:text-white transition-colors">
          <Filter :size="14" /> Filter trace
        </button>
      </div>

      <div class="divide-y divide-white/[0.03]">
        <div 
          v-for="(log, i) in logs" 
          :key="i" 
          class="log-row p-8 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer"
        >
          <div class="flex items-center gap-4 text-sm font-medium">
            <span class="w-24 text-white/20 font-mono">{{ log.time }}</span>
            <span class="w-40 font-bold tracking-tight">{{ log.event }}</span>
            <span class="w-32 text-indigo-400 font-bold uppercase text-[10px] tracking-widest">{{ log.agent }}</span>
            <span 
              :class="[
                'px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border',
                log.status === 'OK' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
              ]"
            >
              {{ log.status }}
            </span>
          </div>
          <ChevronRight :size="18" class="text-white/10 group-hover:text-white/40 transition-all group-hover:translate-x-1" />
        </div>
      </div>

      <div class="p-8 bg-white/[0.02] text-center">
        <button class="text-[11px] font-semibold text-perplexity-text-muted hover:text-white transition-colors">
          Load previous operations
        </button>
      </div>
    </div>

    <!-- Live Feed: Technical Module -->
    <div class="stack-trace-box overflow-hidden">
      <div class="stack-trace-header">
        <div class="flex items-center gap-3">
          <Terminal :size="14" class="text-green-500" />
          <span class="text-[13px] font-semibold text-perplexity-text-muted">Institutional stream runtime</span>
        </div>
      </div>
      <div class="p-8 bg-[#0a0a0a] font-mono text-[11px] text-white/30 space-y-2 overflow-y-auto max-h-48">
        <div class="flex gap-4"><span class="text-white/20 select-none">01</span> <span class="text-blue-400/80">[SYSTEM]</span> PUSHING CRYPTOGRAPHICALLY SIGNED EVENT [ID: 0x42A...] TO SECTOR_B</div>
        <div class="flex gap-4"><span class="text-white/20 select-none">02</span> <span class="text-blue-400/80">[GATEWAY]</span> HANDSHAKE SUCCESSFUL WITH META GRAPH API NODE 18.2</div>
        <div class="flex gap-4"><span class="text-white/20 select-none">03</span> <span class="text-blue-400/80">[AGENT]</span> AURELIUS-ALPHA TRANSITIONED TO STATE: MONITORING_NODES</div>
      </div>
    </div>
  </div>
</template>
