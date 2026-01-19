<script setup lang="ts">
import { 
  Info, 
  Target, 
  Cpu, 
  Layers, 
  ArrowRight,
  Github,
  Twitter,
  Globe
} from 'lucide-vue-next'
import gsap from 'gsap'

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } })
  
  tl.from('.about-header', { y: 30, opacity: 0 }, 0.2)
    .from('.about-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, 0.5)
    .from('.about-footer', { y: 20, opacity: 0 }, 1.2)
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-12 px-4 space-y-24">
    <!-- Header -->
    <header class="about-header space-y-6 text-center lg:text-left">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/10 text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase">
        <Info :size="14" />
        Platform Intel
      </div>
      <h1 class="text-6xl font-black text-white tracking-tighter leading-none font-primary">
        Auto-Notion <span class="text-white/10 italic">Core</span>
      </h1>
      <p class="text-xl text-white/40 max-w-2xl font-medium tracking-tight">
        The next-generation autonomous orchestration layer for content delivery and intelligent automation. Built for scale, designed for precision, and hardened for institutional use.
      </p>
    </header>

    <!-- Mission & Tech -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="about-card p-10 rounded-3xl bg-[#0c0c0c]/50 border border-white/[0.05] space-y-6 group hover:border-white/10 transition-all duration-500">
        <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
          <Target :size="24" />
        </div>
        <h3 class="text-2xl font-bold text-white tracking-tight">Our Mission</h3>
        <p class="text-white/40 leading-relaxed font-medium">
          To empower creators and enterprises with autonomous agents that handle the heavy lifting of content orchestration, allowing humans to focus on high-level strategy.
        </p>
      </div>

      <div class="about-card p-10 rounded-3xl bg-[#0c0c0c]/50 border border-white/[0.05] space-y-6 group hover:border-white/10 transition-all duration-500">
        <div class="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
          <Cpu :size="24" />
        </div>
        <h3 class="text-2xl font-bold text-white tracking-tight">The Engine</h3>
        <p class="text-white/40 leading-relaxed font-medium">
          Powered by a proprietary agentic layer that integrates seamlessly with Notion, n8n, and Meta Graph APIs to provide a unified command center for your digital operations. Recoverable, stable, and highly isolated.
        </p>
      </div>
    </section>

    <!-- Core Architecture -->
    <section class="about-card glass-premium p-12 border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-700">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div class="relative z-10 flex flex-col md:flex-row gap-12 items-center">
        <div class="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white/80 transition-all duration-700">
          <Layers :size="48" />
        </div>
        <div class="flex-1 space-y-4">
          <h2 class="text-3xl font-bold text-white tracking-tight">Institutional Architecture</h2>
          <p class="text-white/40 leading-relaxed font-medium">
            Every layer of Auto-Notion is built with SOC2-level attention to detail. From encrypted credential management to real-time integrity monitoring, your data is orchestrated with absolute security.
          </p>
          <div class="pt-4 flex gap-6">
            <div class="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              <div class="w-1.5 h-1.5 rounded-full bg-green-500/40" />
              NodeJS 20+
            </div>
            <div class="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              <div class="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
              Meta Verified
            </div>
            <div class="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              <div class="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
              AES-256
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer / Connect -->
    <footer class="about-footer border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-white/5 border border-white/10 p-2 overflow-hidden shadow-2xl">
          <img src="/logo.svg" alt="Auto-Notion" class="w-full h-full object-contain" />
        </div>
        <div>
          <p class="text-white font-bold tracking-tight">opendev-labs</p>
          <p class="text-white/20 text-[10px] uppercase font-black tracking-widest">Engineering the future</p>
        </div>
      </div>

      <div class="flex gap-4">
        <a href="https://github.com/opendev-labs" class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
          <Github :size="20" />
        </a>
        <a href="#" class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
          <Twitter :size="20" />
        </a>
        <a href="#" class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
          <Globe :size="20" />
        </a>
      </div>
    </footer>
  </div>
</template>
