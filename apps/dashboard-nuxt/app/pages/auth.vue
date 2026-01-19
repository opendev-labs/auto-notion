<script setup lang="ts">
import { 
  Github, 
  Facebook, 
  Quote, 
  CheckCircle2, 
  Shield, 
  Lock, 
  ArrowRight, 
  Loader2, 
  User as UserIcon,
  Activity,
  Globe,
  Terminal,
  Cpu
} from 'lucide-vue-next'
import { signInWithEmailAndPassword } from 'firebase/auth'
import gsap from 'gsap'

definePageMeta({
  layout: false
})

const { $auth, $providers, $signInWithProvider, $signInWithProviderRedirect } = useNuxtApp()
const router = useRouter()

const isLoading = ref(false)
const isRedirecting = ref(false)
const loadingProvider = ref<string | null>(null)
const error = ref('')

const handleLogin = async (provider: any, providerName: string) => {
  if (!$signInWithProvider || !$signInWithProviderRedirect) return
  isLoading.value = true
  loadingProvider.value = providerName
  error.value = ''
  
  try {
    if (providerName === 'GitHub') {
      isRedirecting.value = true
      await $signInWithProviderRedirect(provider)
    } else {
      await $signInWithProvider(provider)
      router.push('/')
    }
  } catch (err: any) {
    console.error(err)
    isRedirecting.value = false
    const errorMessage = err.message || 'Verification Protocol Failed'
    error.value = `Access Denied: ${errorMessage}. Please re-authenticate.`
  } finally {
    if (!isRedirecting.value) {
      isLoading.value = false
      loadingProvider.value = null
    }
  }
}

const handleDemoLogin = async () => {
  isLoading.value = true
  loadingProvider.value = 'Demo'
  error.value = ''
  try {
    if (!$auth) return
    await signInWithEmailAndPassword($auth as any, 'demo@auto-notion.web.app', 'demo1234')
    router.push('/')
  } catch (err: any) {
    console.error("Demo login error:", err)
    if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
      error.value = 'Demo account not found. Please create user "demo@auto-notion.web.app" with password "demo1234" in Firebase Console.'
    } else {
      error.value = 'Failed to sign in as Demo User.'
    }
  } finally {
    isLoading.value = false
    loadingProvider.value = null
  }
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

  tl.from('.auth-visual', { x: -50, opacity: 0 }, 0.2)
    .from('.auth-content', { x: 50, opacity: 0 }, 0.4)
    .from('.auth-badge', { y: 20, opacity: 0, stagger: 0.1 }, 0.6)
    .from('.auth-title', { y: 20, opacity: 0 }, 0.8)
    .from('.auth-subtitle', { y: 20, opacity: 0 }, 1.0)
    .from('.auth-form', { y: 30, opacity: 0 }, 1.2)
    .from('.system-status', { scale: 0.95, opacity: 0 }, 1.4)
})
</script>

<template>
  <div class="flex min-h-screen bg-perplexity-bg text-perplexity-text font-primary selection:bg-white/10 selection:text-white overflow-hidden relative">
    <!-- Premium Global Noise -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ffilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] opacity-[0.03] pointer-events-none z-[100]" />
    
    <!-- Left Column: Visual & Brand -->
    <div class="auth-visual hidden lg:flex w-[48%] relative overflow-hidden bg-[#0c0c0c] border-r border-perplexity-border flex-col justify-between p-20">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-50 pointer-events-none" />
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-50" />
      <div class="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />

      <div class="relative z-10">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/10 p-2 overflow-hidden shadow-2xl group transition-all duration-500 hover:border-white/20">
            <img src="/logo.svg" alt="Auto-Notion" class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
          </div>
          <span class="text-2xl font-black tracking-tighter text-white">
            Auto-Notion <span class="text-white/20 font-light italic">Institutional</span>
          </span>
        </div>
      </div>

      <div class="relative z-10 space-y-12">
        <div class="space-y-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-black tracking-[0.2em] text-white/40 uppercase auth-badge">
            <Shield :size="14" />
            Security Protocol v4.0.1
          </div>
          <div class="space-y-6">
            <Quote class="w-12 h-12 text-white/5" />
            <h2 class="text-4xl md:text-5xl font-black leading-[1.1] text-white tracking-tighter auth-title">
              Orchestrate with <br />
              <span class="text-white/10 italic">Absolute Precision.</span>
            </h2>
          </div>
          <p class="text-lg text-perplexity-text-muted max-w-md font-medium leading-relaxed auth-subtitle">
            Deploy independent logic engines that operate without constant human intervention. Engineered for institutional scale.
          </p>
        </div>

        <!-- Proof Points -->
        <div class="grid grid-cols-2 gap-8 pt-12 border-t border-white/5">
          <div class="space-y-2 group">
            <p class="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Integrity</p>
            <p class="text-2xl font-bold text-white group-hover:text-white transition-colors">99.98%</p>
          </div>
          <div class="space-y-2 group">
            <p class="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Latency</p>
            <p class="text-2xl font-bold text-white group-hover:text-white transition-colors">&lt; 40ms</p>
          </div>
        </div>
      </div>

      <div class="relative z-10 flex items-center justify-between">
        <div class="flex gap-2">
          <div v-for="i in 3" :key="i" :class="['h-1.5 rounded-full transition-all duration-700', i === 1 ? 'w-8 bg-white/40' : 'w-1.5 bg-white/5']" />
        </div>
        <span class="text-[10px] font-bold tracking-[0.2em] text-white/10 uppercase">opendev-labs internal core</span>
      </div>
    </div>

    <!-- Right Column: Auth Identity -->
    <div class="auth-content w-full lg:w-[52%] flex items-center justify-center p-8 lg:p-24 relative bg-perplexity-bg">
      <div class="w-full max-w-md space-y-12">
        <div class="space-y-4">
          <h1 class="text-4xl font-black tracking-tighter text-white font-primary">
            Initialize Session
          </h1>
          <p class="text-perplexity-text-muted text-lg font-medium">
            Authenticate to access the orchestration layer
          </p>
        </div>

        <div class="space-y-8 auth-form">
          <!-- Status Overlay -->
          <div class="space-y-4">
            <transition 
              enter-active-class="transition-all duration-500" 
              enter-from-class="opacity-0 translate-y-[-10px]" 
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-300"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-if="error" class="p-5 bg-red-500/5 border border-red-500/10 text-red-500/80 text-sm rounded-2xl flex items-center gap-4 backdrop-blur-xl">
                <Shield :size="20" class="shrink-0" />
                <span class="font-medium tracking-tight">{{ error }}</span>
              </div>
            </transition>

            <transition 
              enter-active-class="transition-all duration-500" 
              enter-from-class="opacity-0 scale-95" 
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-300"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div v-if="isRedirecting" class="p-5 bg-white/5 border border-white/10 text-perplexity-text text-sm rounded-2xl flex items-center gap-4 backdrop-blur-xl">
                <Loader2 :size="20" class="shrink-0 animate-spin text-white/40" />
                <span class="font-medium tracking-tight">Handshaking with Authentication Authority...</span>
              </div>
            </transition>
          </div>

          <!-- Auth Providers -->
          <div class="grid gap-4">
            <button
              :disabled="isLoading"
              @click="handleLogin($providers.github, 'GitHub')"
              class="group relative w-full h-16 flex items-center justify-between px-8 bg-white text-black rounded-2xl font-black text-[12px] tracking-tight hover:bg-white/90 active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
            >
              <div class="flex items-center gap-5">
                <Loader2 v-if="loadingProvider === 'GitHub'" class="animate-spin text-black" :size="20" />
                <Github v-else :size="20" />
                <span class="uppercase tracking-[0.1em]">Protocol: GitHub</span>
              </div>
              <ArrowRight :size="20" class="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>

            <button
              :disabled="isLoading"
              @click="handleLogin($providers.google, 'Google')"
              class="group relative w-full h-16 flex items-center justify-between px-8 bg-perplexity-surface border border-perplexity-border text-perplexity-text rounded-2xl font-black text-[12px] tracking-tight hover:bg-white/[0.02] hover:border-white/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
            >
              <div class="flex items-center gap-5">
                <Loader2 v-if="loadingProvider === 'Google'" class="animate-spin" :size="20" />
                <svg v-else class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.24 2.08-2.16 2.72-5.333 2.72-8.08 0-.813-.093-1.587-.2-2.28h-10.57z" />
                </svg>
                <span class="uppercase tracking-[0.1em]">Protocol: Google</span>
              </div>
              <ArrowRight :size="20" class="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>

            <button
              :disabled="isLoading || true"
              class="group relative w-full h-16 flex items-center justify-between px-8 bg-perplexity-surface/40 border border-perplexity-border/50 text-perplexity-text/20 rounded-2xl font-black text-[12px] tracking-tight transition-all duration-300 cursor-not-allowed hidden lg:flex"
            >
              <div class="flex items-center gap-5">
                <Lock :size="20" />
                <span class="uppercase tracking-[0.1em]">Protocol: SAML SSO</span>
              </div>
              <span class="text-[9px] font-black uppercase tracking-widest opacity-20">Enterprise ONLY</span>
            </button>
          </div>

          <!-- Divider -->
          <div class="relative py-4">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-white/[0.03]" />
            </div>
            <div class="relative flex justify-center text-[10px] items-center">
              <span class="px-4 bg-perplexity-bg text-white/10 font-bold uppercase tracking-[0.3em]">Access Alternatives</span>
            </div>
          </div>

          <!-- Guest/Demo -->
          <button
            :disabled="isLoading"
            @click="handleDemoLogin"
            class="group relative w-full h-14 flex items-center justify-center px-8 bg-white/[0.02] border border-white/[0.05] text-white/40 rounded-2xl font-bold text-[11px] tracking-widest hover:bg-white/[0.05] hover:text-white transition-all duration-300 disabled:opacity-50 uppercase"
          >
            <div class="flex items-center gap-4">
              <Loader2 v-if="loadingProvider === 'Demo'" class="animate-spin" :size="16" />
              <UserIcon v-else :size="16" />
              <span>Initialize as Guest Observer</span>
            </div>
          </button>
        </div>

        <!-- System Status Panel -->
        <div class="system-status p-6 rounded-3xl bg-[#0c0c0c]/40 border border-perplexity-border relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span class="text-[10px] font-black text-white/30 uppercase tracking-[.2em]">Live Orchestration State</span>
            </div>
            <Activity :size="14" class="text-white/10" />
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-1">
              <p class="text-[9px] font-black text-white/10 uppercase tracking-widest">Active Nodes</p>
              <p class="text-[14px] font-bold text-white/60">1,204 Instances</p>
            </div>
            <div class="space-y-1">
              <p class="text-[9px] font-black text-white/10 uppercase tracking-widest">Global Sync</p>
              <p class="text-[14px] font-bold text-white/60">Synchronized</p>
            </div>
          </div>
        </div>

        <!-- Legal -->
        <p class="text-center text-[9px] text-white/10 leading-loose max-w-[320px] mx-auto font-black uppercase tracking-[0.2em]">
          By proceeding, you adhere to 
          <NuxtLink to="/terms" class="text-white/20 hover:text-white transition-colors">Operational Terms</NuxtLink> 
          and 
          <NuxtLink to="/privacy" class="text-white/20 hover:text-white transition-colors">Privacy Shield</NuxtLink>.
        </p>
      </div>

      <!-- Corner Branding -->
      <div class="absolute top-10 right-10 hidden lg:flex items-center gap-4 opacity-20">
        <div class="text-right">
          <p class="text-[9px] font-black uppercase tracking-widest">Core Version</p>
          <p class="text-[11px] font-bold lowercase tracking-tighter">v4.0.1+stable</p>
        </div>
        <div class="w-px h-8 bg-white/10" />
        <Terminal :size="18" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-primary {
  font-family: 'Instrument Sans', sans-serif;
}
</style>
