<script setup lang="ts">
import { Settings, Shield, Bell, Database, Globe, Lock, LogOut } from 'lucide-vue-next'
import { signOut } from 'firebase/auth'

const { $auth } = useNuxtApp()
const router = useRouter()

const handleLogout = async () => {
  if (!$auth) return
  await signOut($auth as any)
  router.push('/auth')
}
</script>

<template>
  <div class="py-6 space-y-12">
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10 group">
      <div>
        <h2 class="text-[13px] font-semibold text-perplexity-text-muted">Core system config</h2>
        <h1 class="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none font-sans">System Settings</h1>
      </div>
      <button 
        @click="handleLogout"
        class="px-8 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full font-semibold text-[13px] hover:bg-red-500/20 transition-all flex items-center gap-2 active:scale-95"
      >
        <LogOut :size="14" /> TERMINATE_SESSION
      </button>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
      <!-- Sidebar Nav -->
      <nav class="lg:col-span-1 space-y-2">
        <button v-for="item in ['General', 'Security', 'Notifications', 'Integration', 'Advanced']" :key="item" 
          class="w-full text-left px-5 py-3 rounded-xl text-[13px] font-semibold transition-all"
          :class="[item === 'General' ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white/40 hover:bg-white/5']"
        >
          {{ item }}
        </button>
      </nav>

      <!-- Main Settings -->
      <div class="lg:col-span-3 space-y-10">
        <section class="stack-trace-box overflow-hidden">
          <div class="stack-trace-header">
            <h3 class="text-[13px] font-semibold text-perplexity-text-muted">Profile and institutional</h3>
          </div>
          <div class="p-10 bg-[#0a0a0a]">
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <div class="w-14 h-14 rounded bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/20">
                <Settings :size="24" />
              </div>
              <div class="flex-1 space-y-4 w-full">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-[11px] font-medium text-perplexity-text-muted ml-1">System handle</label>
                    <input type="text" value="Auto-Notion Institutional" class="w-full bg-[#080808] border border-perplexity-border rounded-xl px-5 py-3 text-[13px] font-medium text-white focus:outline-none focus:border-white/20 transition-all">
                  </div>
                  <div class="space-y-2">
                    <label class="text-[11px] font-medium text-perplexity-text-muted ml-1">Runtime mode</label>
                    <select class="w-full bg-[#080808] border border-perplexity-border rounded-xl px-5 py-3 text-[13px] font-medium text-white focus:outline-none focus:border-white/20 transition-all appearance-none cursor-pointer">
                      <option>HIGH_FIDELITY</option>
                      <option>STANDARD_CORE</option>
                      <option>EFFICIENCY_ENGINE</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="stack-trace-box overflow-hidden">
          <div class="stack-trace-header">
            <h3 class="text-[13px] font-semibold text-perplexity-text-muted">Security and protocols</h3>
          </div>
          <div class="p-10 bg-[#0a0a0a] space-y-4">
            <div v-for="s in [
              { label: 'MULTI_FACTOR_AUTH', desc: 'Secure session with MFA encryption layers.', icon: Lock, val: true },
              { label: 'AUTO_LOG_FLUSH', desc: 'Purge operation traces every 24 sectors.', icon: Shield, val: false },
              { label: 'API_GUARD_RUNTIME', desc: 'Rate limit all external graph telemetry.', icon: Globe, val: true }
            ]" :key="s.label" class="flex items-center justify-between p-6 rounded bg-[#080808] border border-white/[0.05] hover:border-green-500/20 transition-colors">
              <div class="flex items-center gap-6">
                <div class="p-3 bg-white/[0.02] text-white/20">
                  <component :is="s.icon" :size="18" />
                </div>
                <div>
                  <h4 class="font-bold text-white/90 text-sm">{{ s.label }}</h4>
                  <p class="text-[11px] text-perplexity-text-muted font-medium mt-1">{{ s.desc }}</p>
                </div>
              </div>
              <div :class="['w-8 h-4 rounded-full relative p-0.5 cursor-pointer transition-all duration-500', s.val ? 'bg-green-500' : 'bg-white/10']">
                <div :class="['w-3 h-3 rounded-full shadow-lg transition-all duration-500', s.val ? 'translate-x-4 bg-black' : 'translate-x-0 bg-white/20']" />
              </div>
            </div>
          </div>
        </section>

        <div class="flex justify-end gap-4">
          <button class="px-8 py-3 bg-white/[0.05] border border-perplexity-border text-white rounded-full font-semibold text-[13px] hover:bg-white/10 transition-all active:scale-95">
            DISCARD
          </button>
          <button class="px-8 py-3 bg-white text-black rounded-full font-semibold text-[13px] hover:bg-white/90 active:scale-95 transition-all shadow-glow-white/10">
            Save system config
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
