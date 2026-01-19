<script setup lang="ts">
import { Shield, Zap, UserPlus, Globe, Check, ArrowRight } from 'lucide-vue-next'
import gsap from 'gsap'

const plans = [
  { name: 'Observer', price: '0', desc: 'Standard visibility and basic agent access.', features: ['1 Instagram Node', 'Basic Automation', 'Standard Logs'], active: false },
  { name: 'Institutional', price: '499', desc: 'Full agent orchestration and scale.', features: ['10 Instagram Nodes', 'Advanced AI Agents', 'Unlimited Audit Logs', 'Prioritized Support'], active: true },
  { name: 'Sovereign', price: '1,999', desc: 'Custom enterprise-grade infrastructure.', features: ['Unlimited Nodes', 'White-labeled Agents', 'Dedicated Cluster', '24/7 War-room Access'], active: false },
]

onMounted(() => {
  gsap.from('.plan-card', {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out'
  })
})
</script>

<template>
  <div class="py-6 space-y-16">
    <header class="text-center space-y-4 max-w-3xl mx-auto">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase">
        <Zap :size="14" /> Resource Allocation
      </div>
      <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight">Institutional Plans</h1>
      <p class="text-white/40 text-xl font-medium leading-relaxed">
        Scale your agentic operations with high-fidelity resource blocks designed for professional orchestrators.
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <PremiumCard
        v-for="plan in plans"
        :key="plan.name"
        :title="'$' + plan.price"
        :subtitle="plan.name"
        :description="plan.desc"
        :icon="plan.name === 'Sovereign' ? Globe : (plan.name === 'Institutional' ? Shield : Zap)"
        :icon-gradient="plan.active ? 'from-indigo-600 to-purple-600' : 'from-white/10 to-white/5'"
        :status="plan.active ? 'CURRENT STATE' : ''"
        :status-color="'indigo'"
        :action-label="plan.active ? 'Operational' : 'Ascend Plan'"
        :disabled="plan.active"
        @action="() => {}"
      >
        <div class="space-y-4 my-8">
          <div v-for="f in plan.features" :key="f" class="flex items-center gap-4 text-white/40 group-hover:text-white/80 transition-colors duration-500">
            <div class="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-indigo-400 transition-colors">
              <Check :size="12" />
            </div>
            <span class="text-[10px] font-bold tracking-tight uppercase">{{ f }}</span>
          </div>
        </div>
      </PremiumCard>
    </div>

    <!-- Security Guarantee -->
    <footer class="glass-premium rounded-xl p-10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
      <div class="flex items-center gap-8">
        <div class="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
          <component :is="Shield" :size="32" />
        </div>
        <div class="space-y-2">
          <h4 class="text-2xl font-bold text-white tracking-tight">Institutional Guarantee</h4>
          <p class="text-white/40 text-sm font-medium">Encrypted billing nodes. No direct storage of PCI data. Fully SOC2 compliant.</p>
        </div>
      </div>
      <div class="flex items-center gap-6 saturate-0 opacity-20 hover:saturate-100 hover:opacity-100 transition-all duration-1000">
        <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-black text-xs">VISA</div>
        <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-black text-xs">MC</div>
        <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-black text-xs">AMEX</div>
      </div>
    </footer>
  </div>
</template>
