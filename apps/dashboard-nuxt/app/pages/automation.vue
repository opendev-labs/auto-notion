<script setup lang="ts">
import { 
  Activity, 
  Zap, 
  ExternalLink, 
  RefreshCw, 
  Terminal, 
  Database 
} from 'lucide-vue-next'
import gsap from 'gsap'

const n8nStatus = ref<'checking' | 'online' | 'offline'>('online')
const syncing = ref<string | null>(null)

const checkStatus = async () => {
  n8nStatus.value = 'checking'
  try {
    const response = await fetch('http://localhost:5678/healthz').catch(() => null)
    if (response && response.status === 200) {
      n8nStatus.value = 'online'
    } else {
      const fallbackResponse = await fetch('http://localhost:5678/').catch(() => null)
      n8nStatus.value = fallbackResponse ? 'online' : 'offline'
    }
  } catch {
    n8nStatus.value = 'offline'
  }
}

const triggerSync = (type: string) => {
  syncing.value = type
  setTimeout(() => {
    syncing.value = null
  }, 2000)
}

const automationCards = [
  {
    id: 'notion-sync',
    title: 'Notion Sync',
    description: 'Synchronize CRM data and leads to Notion Institutional Database.',
    icon: Database,
    color: 'blue'
  },
  {
    id: 'ig-automation',
    title: 'Instagram Automation',
    description: 'Trigger AI-driven content generation and scheduling via n8n.',
    icon: Zap,
    color: 'purple'
  },
  {
    id: 'hub-control',
    title: 'Central Hub',
    description: 'Main routing hub for all platform automation events.',
    icon: Activity,
    color: 'green'
  }
]

onMounted(() => {
  gsap.from('.automation-card', {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  })
})
</script>

<template>
  <div class="space-y-10 py-6">
    <!-- Header Section: Minimal Perplexity Style -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-perplexity-border pb-16 relative group">
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <h2 class="text-[13px] font-semibold text-perplexity-text-muted">Logic core engine</h2>
        </div>
        <h1 class="text-6xl font-bold text-white tracking-tight leading-none">Automation <span class="text-white/20">Control</span></h1>
        <p class="text-perplexity-text-muted text-[15px] leading-relaxed max-w-2xl font-medium">
          Deterministic data synchronization and autonomous workflow management through distributed n8n clusters.
        </p>
      </div>
      
      <div class="flex flex-wrap gap-4">
        <a
          href="http://localhost:5678"
          target="_blank"
          rel="noopener noreferrer"
          class="px-8 py-3 bg-white text-black rounded-full font-semibold text-[13px] hover:bg-white/90 transition-all flex items-center gap-2 active:scale-95 shadow-glow-white/10"
        >
          Open n8n Interface <ExternalLink :size="14" />
        </a>
        <button
          @click="checkStatus"
          class="px-8 py-3 bg-white/[0.05] border border-perplexity-border text-white rounded-full font-semibold text-[13px] hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95"
          :disabled="n8nStatus === 'checking'"
        >
          <RefreshCw :size="14" :class="[n8nStatus === 'checking' ? 'animate-spin' : '']" />
          Probe System Engine
        </button>
      </div>
    </header>

    <!-- Automation Nodes -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PremiumCard
        v-for="card in automationCards"
        :key="card.id"
        :title="card.title"
        :subtitle="'Logic Core'"
        :description="card.description"
        :icon="card.icon"
        :icon-gradient="card.color === 'blue' ? 'from-blue-500 to-indigo-500' : (card.color === 'purple' ? 'from-purple-500 to-pink-500' : 'from-green-500 to-teal-500')"
        :status="n8nStatus === 'online' ? 'Online' : 'Offline'"
        :status-color="n8nStatus === 'online' ? 'green' : 'red'"
        action-label="Execute Workflow"
        :disabled="syncing !== null || n8nStatus !== 'online'"
        @action="triggerSync(card.id)"
      />
    </div>

    <!-- Live Console: Technical Box (Minimal) -->
    <div class="bg-perplexity-surface/40 border border-perplexity-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/10">
      <div class="px-6 py-4 border-b border-perplexity-border bg-white/[0.01] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Terminal :size="16" class="text-perplexity-text-muted" />
          <span class="text-[13px] font-semibold text-perplexity-text-muted">Logic stream runtime</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span class="text-[11px] text-green-500/80 font-medium tracking-wide">System active</span>
        </div>
      </div>
      <div class="p-8 font-mono text-[12px] space-y-2 overflow-y-auto max-h-64 scrollbar-minimal">
        <div class="flex gap-4"><span class="text-white/10 select-none w-4">01</span> <span class="text-perplexity-text-muted/60">[{{ new Date().toLocaleTimeString() }}]</span> <span class="text-white/60">System initialization sequence activated...</span></div>
        <div class="flex gap-4"><span class="text-white/10 select-none w-4">02</span> <span class="text-perplexity-text-muted/60">[{{ new Date().toLocaleTimeString() }}]</span> <span class="text-white/40 italic">Loading logic/core/n8n hooks...</span></div>
        <div class="flex gap-4" :class="[n8nStatus === 'online' ? 'text-green-500/60' : 'text-red-500/60']">
          <span class="text-white/10 select-none w-4">03</span>
          <span class="text-perplexity-text-muted/60">[{{ new Date().toLocaleTimeString() }}]</span> 
          <span class="font-bold uppercase tracking-tight">Engine status: {{ n8nStatus.toUpperCase() }}</span>
        </div>
        <div v-if="syncing" class="flex gap-4 text-purple-400/60 animate-pulse">
          <span class="text-white/10 select-none w-4">04</span>
          <span class="text-perplexity-text-muted/60">[{{ new Date().toLocaleTimeString() }}]</span> 
          <span class="font-bold uppercase tracking-widest">EXECUTING_WORKFLOW: {{ syncing.toUpperCase() }}</span>
        </div>
        <div class="flex gap-4"><span class="text-white/10 select-none w-4">05</span> <span class="text-perplexity-text-muted/60">[{{ new Date().toLocaleTimeString() }}]</span> <span class="text-white/20">Awaiting instructions from central hub.</span></div>
      </div>
    </div>
  </div>
</template>
