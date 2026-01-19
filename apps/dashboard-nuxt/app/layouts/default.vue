<script setup lang="ts">
import { ref, computed } from 'vue'
import { LogOut, User as UserIcon, ChevronDown } from 'lucide-vue-next'

const { $auth, $user } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const user = $user

const publicPages = ['/home', '/about', '/auth', '/privacy', '/terms', '/refund-policy', '/data-deletion']
const isPublicPage = computed(() => publicPages.includes(route.path))

const sidebarCollapsed = ref(true)
const isProfileOpen = ref(false)

const handleSignOut = async () => {
  if (!$auth) return
  try {
    await ($auth as any).signOut()
    router.push('/home')
  } catch (err) {
    console.error('Sign out error:', err)
  }
}
</script>

<template>
  <div class="flex h-screen bg-perplexity-bg text-perplexity-text font-nuxt selection:bg-white/10 selection:text-white overflow-hidden">
    <!-- Subtle Global Overlay -->
    <div class="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 32px 32px;"></div>

    <Sidebar v-if="!isPublicPage" v-model:collapsed="sidebarCollapsed" />
    
    <!-- Floating Profile / Auth UI -->
    <div class="fixed top-8 right-8 z-[100]">
      <!-- Authenticated State -->
      <div v-if="user" class="relative">
        <button 
          @click="isProfileOpen = !isProfileOpen"
          class="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-perplexity-surface/40 border border-perplexity-border backdrop-blur-xl hover:border-white/10 transition-all duration-300 group active:scale-95"
        >
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white/80 border border-white/10 overflow-hidden shadow-lg">
            <template v-if="user?.photoURL">
              <img :src="user.photoURL" class="w-full h-full object-cover" />
            </template>
            <UserIcon v-else :size="16" />
          </div>
          <span class="text-[11px] font-bold text-white/50 group-hover:text-white/80 transition-colors uppercase tracking-widest hidden md:block">
            {{ user?.displayName || 'Session Active' }}
          </span>
          <ChevronDown :size="14" class="text-white/20 group-hover:text-white/40 transition-transform" :class="{ 'rotate-180': isProfileOpen }" />
        </button>

        <!-- Dropdown -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0 -translate-y-2"
          enter-to-class="transform scale-100 opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform scale-100 opacity-100 translate-y-0"
          leave-to-class="transform scale-95 opacity-0 -translate-y-2"
        >
          <div v-if="isProfileOpen" class="absolute top-full right-0 mt-3 w-48 bg-perplexity-surface/90 border border-perplexity-border rounded-xl backdrop-blur-2xl shadow-2xl py-2 overflow-hidden ring-1 ring-white/5">
            <div class="px-4 py-2 border-b border-white/5 mb-2">
              <p class="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Current Session</p>
              <p class="text-[11px] font-medium text-white/60 truncate">{{ user?.email || 'Guest User' }}</p>
            </div>
            
            <button 
              @click="handleSignOut"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all group"
            >
              <LogOut :size="14" class="group-hover:-translate-x-0.5 transition-transform" />
              <span>Sign Out Session</span>
            </button>
          </div>
        </transition>
      </div>

      <!-- Unauthenticated State -->
      <div v-else-if="!isPublicPage || route.path !== '/auth'" class="flex items-center gap-4">
        <NuxtLink 
          to="/auth" 
          class="px-6 py-2.5 rounded-full bg-white text-black text-[11px] font-bold hover:bg-white/90 transition-all active:scale-95 shadow-glow-white/10"
        >
          Sign In
        </NuxtLink>
      </div>
    </div>
    
    <main class="flex-1 h-full overflow-y-auto relative z-10">
      <div class="max-w-[1400px] mx-auto w-full min-h-full p-4 md:p-10 lg:p-16">
        <slot />
      </div>
    </main>
  </div>
</template>

<style>
/* Global Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
