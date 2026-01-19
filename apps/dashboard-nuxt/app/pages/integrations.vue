<script setup lang="ts">
import { Link2, Database, Share2, Globe, Command, ArrowRight } from 'lucide-vue-next'
import gsap from 'gsap'

const platforms = [
  { name: 'Notion', icon: Database, status: 'Connected', desc: 'Institutional DB' },
  { name: 'n8n', icon: Command, status: 'Active', desc: 'Logic Engine' },
  { name: 'Meta', icon: Share2, status: 'Authorized', desc: 'Instagram API' },
  { name: 'Webhooks', icon: Globe, status: 'Stable', desc: 'Inbound Stream' },
]

onMounted(() => {
  gsap.from('.platform-card', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  })
})
</script>

<template>
  <div class="py-8 space-y-16">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.05] pb-12 group">
      <div class="space-y-4">
        <h2 class="text-[13px] font-semibold text-perplexity-text-muted">Core ecosystem hub</h2>
        <h1 class="text-6xl font-black text-white tracking-tighter leading-none font-sans">Integration <span class="text-white/10 font-bold">Portal</span></h1>
      </div>
      <button class="px-10 py-4 bg-white text-black rounded-full font-semibold text-[13px] hover:bg-white/90 transition-all flex items-center gap-3 active:scale-95 shadow-glow-white/10">
        <Link2 :size="14" /> ADD_CONNECTION
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <PremiumCard
        v-for="p in platforms"
        :key="p.name"
        :title="p.name"
        subtitle="Operational Node"
        :description="p.desc"
        :icon="p.icon"
        icon-gradient="from-white/10 to-white/5"
        status="Stable"
        status-color="green"
        action-label="Configure Connection"
        @action="() => {}"
      />
    </div>

    <!-- API Keys Notice: Technical Box -->
    <div class="stack-trace-box overflow-hidden">
      <div class="stack-trace-header">
        <div class="flex items-center gap-3">
          <Link2 :size="14" class="text-indigo-400" />
          <span class="text-[10px] font-bold uppercase tracking-widest text-white/50">Security_Vault_Runtime</span>
        </div>
      </div>
      <div class="p-10 bg-[#0a0a0a] flex flex-col lg:flex-row justify-between items-center gap-12">
        <div class="space-y-4">
          <h3 class="text-2xl font-black text-white tracking-tighter uppercase font-sans">Institutional Security Layer</h3>
          <p class="text-perplexity-text-muted text-[15px] leading-relaxed font-medium max-w-2xl">
            Credential encryption: <span class="text-indigo-400">AES-256 (FIPS-140-2)</span>. Source metadata verified. Raw keys are never cached in unencrypted sectors.
          </p>
        </div>
        <button class="px-10 py-4 bg-white/[0.05] border border-perplexity-border text-white rounded-full font-semibold text-[13px] hover:bg-white/10 transition-all active:scale-95">
          MANAGE_VAULT_OVERRIDE
        </button>
      </div>
    </div>
  </div>
</template>
