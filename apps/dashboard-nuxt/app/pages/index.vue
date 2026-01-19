<script setup lang="ts">
import { 
  Zap, 
  Share2, 
  UserPlus, 
  Moon, 
  History, 
  Settings, 
  ArrowUpRight, 
  Activity, 
  ShieldCheck, 
  Globe 
} from 'lucide-vue-next'
import gsap from 'gsap'

const modules = [
  {
    id: 'automation',
    label: 'Automations',
    icon: Zap,
    path: '/automation',
    description: 'n8n Logic Core',
    settings: [
      { label: 'Auto-Sync', value: true },
      { label: 'Cloud Mode', value: false }
    ]
  },
  {
    id: 'ig-connections',
    label: 'Instagram',
    icon: Share2,
    path: '/ig-connections',
    description: 'Meta Graph Nodes',
    settings: [
      { label: 'Live Fetching', value: true },
      { label: 'DM Automation', value: true }
    ]
  },
  {
    id: 'agents',
    label: 'SUPER AGENTS ADVANCED',
    icon: UserPlus,
    path: '/super-agents',
    description: 'Cognitive Engine',
    settings: [
      { label: 'Sentiment AI', value: true },
      { label: 'Autonomous Replies', value: false }
    ]
  },
  {
    id: 'cosmic',
    label: 'Scheduler',
    icon: Moon,
    path: '/cosmic',
    description: 'Chronos Planning',
    settings: [
      { label: 'Smart Scheduling', value: true },
      { label: 'Optimal Window', value: true }
    ]
  }
]

const stats = [
  { label: 'Engine Load', value: '12%', icon: Activity },
  { label: 'Logic Integrity', value: '99.9%', icon: ShieldCheck },
  { label: 'Cloud Nodes', value: '8 Active', icon: Globe },
  { label: 'Uptime', value: '99.98%', icon: Activity }
]

onMounted(() => {
  gsap.from('.dashboard-header', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
  
  gsap.from('.stat-card', { 
    y: 20, 
    opacity: 0, 
    stagger: 0.05, 
    duration: 0.6, 
    ease: 'power2.out',
    delay: 0.2
  })
  
  gsap.from('.module-card', { 
    y: 30, 
    opacity: 0, 
    stagger: 0.1, 
    duration: 0.8, 
    ease: 'power2.out',
    delay: 0.4
  })
})
</script>

<template>
  <div class="space-y-12">
    <!-- Dashboard Header -->
    <header class="dashboard-header flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.05] pb-10">
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <span class="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Institutional Node Active</span>
        </div>
        <h1 class="text-5xl font-black text-white tracking-tighter leading-none font-primary">
          Mission <span class="text-white/10 uppercase italic">Control</span>
        </h1>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
          <Activity :size="14" class="text-indigo-400" />
          <span class="text-[11px] font-bold text-white/40 uppercase tracking-widest">v4.0.1 Stable</span>
        </div>
      </div>
    </header>

    <!-- Quick Stats -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="stat-card p-8 rounded-3xl bg-[#0c0c0c]/40 border border-white/[0.03] hover:border-white/10 transition-all duration-500 group relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <p class="text-[10px] font-black text-white/20 mb-4 uppercase tracking-[0.2em] relative z-10 group-hover:text-white/40 transition-colors">
          {{ stat.label }}
        </p>
        <div class="flex items-center gap-4 relative z-10">
          <h3 class="text-3xl font-bold text-white tracking-tighter">
            {{ stat.value }}
          </h3>
          <component :is="stat.icon" :size="16" class="text-white/10 group-hover:text-white/20 transition-all" />
        </div>
      </div>
    </section>

    <!-- Modules Grid -->
    <section class="space-y-8">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-3">
          <Zap :size="18" class="text-yellow-500" />
          Operational Modules
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PremiumCard
          v-for="module in modules"
          :key="module.id"
          class="module-card shadow-2xl"
          :title="module.label"
          :subtitle="module.description"
          :icon="module.icon"
          status="READY"
          :stats="module.settings"
          action-label="Access Command"
          :action-path="module.path"
        />
      </div>
    </section>

    <!-- System Status Footer -->
    <footer class="pt-12 border-t border-white/5 flex flex-wrap gap-12">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
          <ShieldCheck :size="16" />
        </div>
        <div>
          <p class="text-[10px] font-black text-white/10 uppercase tracking-widest">Security State</p>
          <p class="text-[11px] font-bold text-white/60">Institutional Locked</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
          <Globe :size="16" />
        </div>
        <div>
          <p class="text-[10px] font-black text-white/10 uppercase tracking-widest">Network</p>
          <p class="text-[11px] font-bold text-white/60">Edge Propagated</p>
        </div>
      </div>
    </footer>
  </div>
</template>
