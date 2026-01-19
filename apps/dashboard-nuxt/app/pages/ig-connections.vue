<script setup lang="ts">
import { Share2, Instagram, Link, ExternalLink, RefreshCw, Smartphone } from 'lucide-vue-next'
import gsap from 'gsap'

const accounts = [
  { id: 1, handle: 'auto_notion_premium', status: 'Connected', followers: '12.4K', reach: '85.2K' },
  { id: 2, handle: 'opendev_labs_hq', status: 'Linked', followers: '45.1K', reach: '1.2M' },
]

onMounted(() => {
  gsap.from('.account-card', {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  })
})
</script>

<template>
  <div class="py-8 space-y-16">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-perplexity-border pb-16 relative group">
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          <h2 class="text-[13px] font-semibold text-perplexity-text-muted">Core meta nodes</h2>
        </div>
        <h1 class="text-6xl font-bold text-white tracking-tight leading-none">Instagram <span class="text-white/20">Nodes</span></h1>
      </div>
      <button class="px-8 py-3.5 bg-white text-black rounded-full font-semibold text-[13px] hover:bg-white/90 transition-all flex items-center gap-3 active:scale-95 shadow-glow-white/10">
        <Link :size="16" /> Associate Node
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <PremiumCard
        v-for="acc in accounts"
        :key="acc.id"
        :title="'@' + acc.handle"
        subtitle="Meta Graph Node"
        :icon="Instagram"
        icon-gradient="from-pink-500 via-red-500 to-yellow-500"
        :status="acc.status"
        :stats="[
          { label: 'Total Followers', value: acc.followers },
          { label: 'Impression Reach', value: acc.reach }
        ]"
        action-label="Operational Analytics"
        @action="() => {}"
      />
    </div>

    <!-- Integration Stats: Technical Module (Minimal) -->
    <div class="bg-perplexity-surface/40 border border-perplexity-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/10">
      <div class="px-6 py-4 border-b border-perplexity-border bg-white/[0.01] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Smartphone :size="16" class="text-perplexity-text-muted" />
          <span class="text-[13px] font-semibold text-perplexity-text-muted">DM engine runtime</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          <span class="text-[11px] text-pink-500/80 font-medium tracking-wide">Meta link active</span>
        </div>
      </div>
      <div class="p-10 flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1 space-y-4">
          <h3 class="text-3xl font-bold text-white tracking-tight uppercase">Logic Messaging Layer</h3>
          <p class="text-perplexity-text-muted text-[15px] leading-relaxed font-medium">
            Direct messaging engine is serving all active nodes. Current processing latency: <span class="text-green-400 font-bold">150ms</span>. Connection integrity verified.
          </p>
        </div>
        <div class="flex gap-12 bg-white/[0.02] p-8 rounded-2xl border border-perplexity-border relative overflow-hidden group/stats">
          <div class="absolute inset-0 bg-pink-500/[0.02] opacity-0 group-hover/stats:opacity-100 transition-opacity" />
          <div class="text-center relative z-10">
            <h4 class="text-4xl font-bold text-white mb-1 tracking-tight">98%</h4>
            <p class="text-[11px] font-medium text-perplexity-text-muted">SLA compliance</p>
          </div>
          <div class="w-px h-12 bg-perplexity-border self-center relative z-10" />
          <div class="text-center relative z-10">
            <h4 class="text-4xl font-bold text-white mb-1 tracking-tight">2.4m</h4>
            <p class="text-[11px] font-medium text-perplexity-text-muted">Daily events</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
