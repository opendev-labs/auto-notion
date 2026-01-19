<script setup lang="ts">
import { Gavel, ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen p-8 max-w-4xl mx-auto py-24">
    <NuxtLink to="/" class="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group">
      <ArrowLeft :size="16" class="group-hover:-translate-x-1 transition-transform" />
      <span class="text-[13px] font-semibold text-white/60">Back to operations</span>
    </NuxtLink>

    <div class="glass-premium p-12 rounded-xl border border-white/10 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div class="flex items-center gap-6 mb-12">
        <div class="w-16 h-16 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
          <Gavel :size="32" />
        </div>
        <div>
          <h1 class="text-4xl font-bold tracking-tighter">Engagement Terms</h1>
          <p class="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Institutional Governance v2.1</p>
        </div>
      </div>

      <div class="space-y-12 text-zinc-400 font-light leading-relaxed">
        <section>
          <h2 class="text-white text-lg font-bold mb-4 tracking-tight">1. Authorized Usage</h2>
          <p>
            Auto-Notion Institutional is provided as an enterprise resource. Users must maintain valid credentials and adhere to their organization's internal compliance standards when configuring autonomous agents.
          </p>
        </section>

        <section>
          <h2 class="text-white text-lg font-bold mb-4 tracking-tight">2. Algorithmic Responsibility</h2>
          <p>
            Users are responsible for the actions initiated by their AI SuperAgents. While our filters prevent high-risk operations, the final verification of distributed content remains with the institutional operator.
          </p>
        </section>

        <section>
          <h2 class="text-white text-lg font-bold mb-4 tracking-tight">3. Service Availability</h2>
          <p>
            We target 99.99% uptime for the synchronization engine. Scheduled maintenance cycles are performed during low-traffic windows and communicated via the Audit Trail dashboard.
          </p>
        </section>
      </div>

      <div class="mt-16 pt-12 border-t border-white/5 flex items-center justify-between">
        <p class="text-[9px] text-white/20 font-bold uppercase tracking-widest">Last Updated: January 19, 2026</p>
        <div class="flex gap-4">
          <div class="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-pulse" />
          <span class="text-[11px] text-indigo-500/60 font-semibold">Legal systems online</span>
        </div>
      </div>
    </div>
  </div>
</template>
