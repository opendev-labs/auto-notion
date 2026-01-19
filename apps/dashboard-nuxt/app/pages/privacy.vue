<script setup lang="ts">
import { ShieldCheck, ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen p-8 max-w-4xl mx-auto py-24">
    <NuxtLink to="/" class="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group">
      <ArrowLeft :size="16" class="group-hover:-translate-x-1 transition-transform" />
      <span class="text-[13px] font-semibold text-white/60">Back to operations</span>
    </NuxtLink>

    <div class="glass-premium p-12 rounded-xl border border-white/10 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div class="flex items-center gap-6 mb-12">
        <div class="w-16 h-16 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
          <ShieldCheck :size="32" />
        </div>
        <div>
          <h1 class="text-4xl font-bold tracking-tighter">Privacy Protocol</h1>
          <p class="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Institutional Data Protection v4.0</p>
        </div>
      </div>

      <div class="space-y-12 text-zinc-400 font-light leading-relaxed">
        <section>
          <h2 class="text-white text-lg font-bold mb-4 tracking-tight">1. Data Sovereignty</h2>
          <p>
            At Auto-Notion Institutional, we adhere to the principle of absolute data sovereignty. Your synchronization data, credentials, and automation workflows remain encrypted at rest and in transit using AES-256 and TLS 1.3 protocols.
          </p>
        </section>

        <section>
          <h2 class="text-white text-lg font-bold mb-4 tracking-tight">2. Zero-Trace Architecture</h2>
          <p>
            Our infrastructure is designed to operate with minimal data retention. Audit trails are maintained for security compliance but are periodically purged according to your organization's selected data retention policy.
          </p>
        </section>

        <section>
          <h2 class="text-white text-lg font-bold mb-4 tracking-tight">3. Third-Party Integration</h2>
          <p>
            Data shared with platforms like Instagram, Notion, and LinkedIn is limited to the minimum scope required for the requested automation actions. We do not sell or trade institutional data to third-party brokers.
          </p>
        </section>
      </div>

      <div class="mt-16 pt-12 border-t border-white/5 flex items-center justify-between">
        <p class="text-[9px] text-white/20 font-bold uppercase tracking-widest">Last Updated: January 19, 2026</p>
        <div class="flex gap-4">
          <div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
          <span class="text-[11px] text-green-500/60 font-semibold">Compliance active</span>
        </div>
      </div>
    </div>
  </div>
</template>
