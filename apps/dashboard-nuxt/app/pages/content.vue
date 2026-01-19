<script setup lang="ts">
import { BookOpen, Search, Filter, Plus, Music, Play, Terminal } from 'lucide-vue-next'
import gsap from 'gsap'

const assets = [
  { name: 'Product Reveal A', type: 'Video', size: '124MB', date: 'Jan 18' },
  { name: 'Cosmic Sequence', type: 'Audio', size: '12MB', date: 'Jan 17' },
  { name: 'Institutional Guide', type: 'Document', size: '2.4MB', date: 'Jan 15' },
  { name: 'Motion Graphic #2', type: 'Animation', size: '45MB', date: 'Jan 12' },
]

onMounted(() => {
  gsap.from('.asset-card', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  })
})
</script>

<template>
  <div class="py-6 space-y-12">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
      <div>
        <h2 class="text-[13px] font-semibold text-perplexity-text-muted">System vault deterministic</h2>
        <h1 class="text-5xl font-black text-white tracking-tighter">Content Library</h1>
      </div>
      <div class="flex gap-4">
        <div class="relative group">
          <input 
            type="text" 
            placeholder="FILTER_VAULT..." 
            class="bg-white/[0.03] border border-white/10 rounded-full px-12 py-3 text-[13px] font-medium text-white focus:outline-none focus:border-green-500/30 transition-all w-64"
          >
          <Search :size="14" class="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-green-500 transition-colors" />
        </div>
        <button class="px-8 py-3 bg-white text-black rounded-full font-semibold text-[13px] hover:bg-white/90 transition-all flex items-center gap-3 active:scale-95 shadow-glow-white/10">
          <Plus :size="14" /> INGEST_ASSET
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <PremiumCard
        v-for="a in assets"
        :key="a.name"
        :title="a.name"
        :subtitle="'type/' + a.type.toLowerCase()"
        :icon="a.type === 'Video' ? Play : (a.type === 'Audio' ? Music : BookOpen)"
        icon-gradient="from-indigo-500 to-purple-500"
        :stats="[
          { label: 'SIZE', value: a.size },
          { label: 'MODIFIED', value: a.date }
        ]"
        action-label="PROBE_DETAILS"
        @action="() => {}"
      >
        <div class="w-full aspect-video rounded bg-[#0a0a0a] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-green-500/30 transition-all">
          <Play v-if="a.type === 'Video'" :size="20" class="text-white/10 group-hover:text-green-500 transition-all group-hover:scale-110 duration-500" />
          <Music v-else-if="a.type === 'Audio'" :size="20" class="text-white/10 group-hover:text-green-500 transition-all group-hover:scale-110 duration-500" />
          <BookOpen v-else :size="20" class="text-white/10 group-hover:text-green-500 transition-all group-hover:scale-110 duration-500" />
        </div>
      </PremiumCard>
    </div>

    <!-- Storage Analysis -->
    <div class="stack-trace-box overflow-hidden">
      <div class="stack-trace-header">
        <div class="flex items-center gap-3">
          <Database :size="14" class="text-indigo-400" />
          <span class="text-[13px] font-semibold text-perplexity-text-muted">Vault metrics runtime</span>
        </div>
      </div>
      <div class="p-10 bg-[#0a0a0a] grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="space-y-4">
          <p class="text-[11px] font-medium text-perplexity-text-muted">Total vault occupancy</p>
          <div class="flex items-baseline gap-2">
            <h2 class="text-5xl font-bold text-white tracking-tight">12.4</h2>
            <span class="text-xl font-bold text-perplexity-text-muted">GB</span>
          </div>
          <div class="w-full bg-white/[0.03] h-1 border border-white/[0.05] overflow-hidden">
            <div class="w-[62%] h-full bg-indigo-500/80 shadow-[0_0_10px_rgba(129,140,248,0.4)]" />
          </div>
        </div>
        <div class="space-y-4">
          <p class="text-[11px] font-medium text-perplexity-text-muted">Asset object count</p>
          <h2 class="text-5xl font-bold text-white tracking-tight">1,240</h2>
          <p class="text-perplexity-text-muted text-[11px] font-medium">Across 4 Institutional Edges</p>
        </div>
        <div class="space-y-4">
          <p class="text-[11px] font-medium text-perplexity-text-muted">Hydration state</p>
          <h2 class="text-5xl font-bold text-green-500 tracking-tight">Stable</h2>
          <p class="text-perplexity-text-muted text-[11px] font-medium">Integrity checksum verified</p>
        </div>
      </div>
    </div>
  </div>
</template>
