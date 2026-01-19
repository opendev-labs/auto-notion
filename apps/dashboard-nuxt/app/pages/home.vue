<script setup lang="ts">
import { onMounted } from 'vue'
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

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

  tl.from('.hero-badge', { y: 20, opacity: 0, stagger: 0.1 }, 0.2)
    .from('.hero-title', { y: 40, opacity: 0 }, 0.4)
    .from('.hero-description', { y: 30, opacity: 0 }, 0.6)
    .from('.hero-actions', { y: 20, opacity: 0 }, 0.8)
    .from('.hero-visual', { y: 40, opacity: 0, duration: 1.5, ease: 'expo.out' }, 1)
})
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-40 overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] opacity-50 animate-pulse" />
        <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] opacity-30" />
      </div>

      <div class="max-w-5xl mx-auto px-4 relative z-10 text-center">
        <div class="hero-content space-y-10">
          <div class="flex flex-wrap items-center gap-4 justify-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase hero-badge">
              <Activity :size="14" />
              System Live: v4.0.1
            </div>
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/5 border border-green-500/10 text-[10px] font-black tracking-[0.2em] text-green-500 uppercase hero-badge">
              <ShieldCheck :size="14" />
              Core Integrity: Stable
            </div>
          </div>
          
          <div class="space-y-6">
            <h1 class="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] font-primary hero-title">
              Agentic <br />
              <span class="text-white/10 italic">Operations</span>
            </h1>
            <p class="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-medium tracking-tight hero-description">
              The institutional-grade orchestration layer for autonomous content ecosystems. Engineered for precision, built for scale.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-6 justify-center hero-actions">
            <NuxtLink to="/auth" class="px-12 py-5 bg-white text-black rounded-full font-bold text-[14px] hover:bg-white/90 transition-all active:scale-95 shadow-glow-white/20">
              Sign In to Core
            </NuxtLink>
            <NuxtLink to="/about" class="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold text-[14px] hover:bg-white/10 transition-all active:scale-95">
              Platform Intel
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Hero Visual (Stack Trace Style) -->
      <div class="mt-32 max-w-6xl mx-auto px-4 hero-visual">
        <div class="glass-premium p-1 bg-[#0c0c0c]/80 border-white/5 shadow-2xl overflow-hidden group">
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/[0.03] bg-white/[0.02]">
            <div class="flex gap-2">
              <div class="w-2.5 h-2.5 rounded-full bg-red-500/20" />
              <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
              <div class="w-2.5 h-2.5 rounded-full bg-green-500/20" />
            </div>
            <div class="text-[10px] font-mono text-white/20 tracking-widest uppercase">core_engine_logs.sys</div>
            <div class="w-10" />
          </div>
          <div class="p-8 font-mono text-[12px] leading-relaxed text-white/40 overflow-hidden">
            <div class="flex gap-6 group/line hover:bg-white/[0.02] transition-colors">
              <span class="text-white/10 select-none w-8 text-right">01</span>
              <span class="text-indigo-400">import</span> { <span class="text-white/80">AutonomousOrchestrator</span> } <span class="text-indigo-400">from</span> <span class="text-green-400">'@auto-notion/core'</span>
            </div>
            <div class="flex gap-6 group/line hover:bg-white/[0.02] transition-colors">
              <span class="text-white/10 select-none w-8 text-right">02</span>
              <span>&nbsp;</span>
            </div>
            <div class="flex gap-6 group/line hover:bg-white/[0.02] transition-colors">
              <span class="text-white/10 select-none w-8 text-right">03</span>
              <span class="text-indigo-400">const</span> <span class="text-white/80">system</span> = <span class="text-indigo-400">await</span> <span class="text-white/80">AutonomousOrchestrator</span>.<span class="text-yellow-400">initialize</span>({
            </div>
            <div class="flex gap-6 group/line hover:bg-white/[0.02] transition-colors">
              <span class="text-white/10 select-none w-8 text-right">04</span>
              <span class="pl-4">mode: <span class="text-green-400">'INSTITUTIONAL_GRADE'</span>,</span>
            </div>
            <div class="flex gap-6 group/line hover:bg-white/[0.02] transition-colors">
              <span class="text-white/10 select-none w-8 text-right">05</span>
              <span class="pl-4">integrity: 0.9998,</span>
            </div>
            <div class="flex gap-6 group/line hover:bg-white/[0.02] transition-colors">
              <span class="text-white/10 select-none w-8 text-right">06</span>
              <span class="pl-4">security: <span class="text-indigo-400">true</span></span>
            </div>
            <div class="flex gap-6 group/line hover:bg-white/[0.02] transition-colors">
              <span class="text-white/10 select-none w-8 text-right">07</span>
              <span class="text-white/80">});</span>
            </div>
            <div class="flex gap-6 group/line hover:bg-white/[0.02] transition-colors">
              <span class="text-white/10 select-none w-8 text-right">08</span>
              <span>&nbsp;</span>
            </div>
            <div class="flex gap-6 group/line hover:bg-white/[0.02] transition-colors">
              <span class="text-white/10 select-none w-8 text-right">09</span>
              <span class="text-green-400">// System stabilized. Layer 4 assets active.</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content / Why Section -->
    <section class="max-w-7xl mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5">
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-white tracking-tight">Autonomous Core</h3>
        <p class="text-white/40 text-sm leading-relaxed font-medium">Fully independent logic engines that operate without constant human intervention, ensuring 24/7 reliability.</p>
      </div>
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-white tracking-tight">Deep Integrations</h3>
        <p class="text-white/40 text-sm leading-relaxed font-medium">Native connectors for Notion, Meta, and Enterprise ERPs, providing a seamless data flow across your entire stack.</p>
      </div>
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-white tracking-tight">Secured Assets</h3>
        <p class="text-white/40 text-sm leading-relaxed font-medium">Military-grade encryption and isolated execution environments for every node in your orchestration network.</p>
      </div>
    </section>
  </div>
</template>
