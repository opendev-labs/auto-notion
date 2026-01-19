<script setup lang="ts">
import { 
  LayoutDashboard, 
  Share2, 
  UserPlus, 
  Moon, 
  Settings, 
  Zap, 
  History, 
  Link2, 
  BookOpen,
  Activity
} from 'lucide-vue-next'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits(['update:collapsed'])

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'automation', label: 'Automations', icon: Zap, path: '/automation' },
  { id: 'ig-connections', label: 'Instagram', icon: Share2, path: '/ig-connections' },
  { id: 'content', label: 'Content Library', icon: BookOpen, path: '/content' },
  { id: 'agents', label: 'AI SuperAgents', icon: UserPlus, path: '/super-agents' },
  { id: 'cosmic', label: 'Scheduler', icon: Moon, path: '/cosmic' },
  { id: 'integrations', label: 'Integrations', icon: Link2, path: '/integrations' },
  { id: 'logs', label: 'Logs & History', icon: History, path: '/logs' },
]

const toggleCollapse = () => {
  emit('update:collapsed', !props.collapsed)
}
</script>

<template>
  <aside 
    :class="[
      'hidden lg:flex z-50 bg-perplexity-bg border-r border-perplexity-border h-screen flex-col py-6 px-3 text-white relative shrink-0 transition-all duration-500 ease-in-out',
      collapsed ? 'w-16' : 'w-60'
    ]"
  >
    <!-- Collapse Toggle (Premium) -->
    <button
      @click="toggleCollapse"
      class="absolute -right-3 top-8 p-1.5 rounded-full bg-perplexity-surface border border-perplexity-border text-white/30 hover:text-white transition-all z-50 group hover:scale-110 shadow-xl"
    >
      <Activity 
        :size="11" 
        :class="['transition-transform duration-500', collapsed ? 'rotate-180' : 'rotate-0']" 
      />
    </button>

    <!-- Logo Section (Minimalist) -->
    <div 
      :class="[
        'flex items-center gap-3.5 mb-14 overflow-hidden px-3',
        collapsed ? 'justify-center' : 'justify-start'
      ]"
    >
      <div class="relative flex items-center justify-center shrink-0">
        <div class="absolute inset-0 bg-white/5 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <img src="/logo.svg" alt="Auto-Notion" class="w-7 h-7 object-contain opacity-90 relative z-10" />
      </div>
      <div v-if="!collapsed" class="transition-all duration-500 opacity-100 flex-1">
        <h2 class="font-bold text-lg leading-tight tracking-tight text-white/95">Auto Notion</h2>
      </div>
    </div>

    <!-- Navigation (Pure Icon Style) -->
    <nav class="flex-1 space-y-4">
      <NuxtLink
        v-for="item in navItems"
        :key="item.id"
        :to="item.path"
        :title="collapsed ? item.label : ''"
        class="nav-item group flex items-center gap-4 transition-all duration-300 relative px-4"
        active-class="nav-item-active"
        exact-active-class="nav-item-active"
      >
        <component 
          :is="item.icon" 
          :size="20" 
          class="transition-all duration-300 shrink-0 opacity-40 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
        />
        <span v-if="!collapsed" class="text-[13px] font-medium transition-all duration-300 whitespace-nowrap opacity-60 group-hover:opacity-100">{{ item.label }}</span>
        
        <!-- Hover tooltip for collapsed mode -->
        <div v-if="collapsed" class="absolute left-[calc(100%+1.5rem)] px-4 py-2 bg-perplexity-surface text-white text-[11px] rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-50 shadow-2xl border border-perplexity-border translate-x-[-12px] group-hover:translate-x-0">
          {{ item.label }}
        </div>
      </NuxtLink>
    </nav>

    <!-- Footer Section -->
    <div :class="['mt-auto pt-6 transition-all duration-500', collapsed ? 'flex flex-col items-center' : 'px-1']">
      <NuxtLink
        :to="'/settings'"
        :title="collapsed ? 'Settings' : ''"
        class="nav-item group flex items-center gap-4 transition-all duration-300 w-full px-4 active:scale-95"
        active-class="nav-item-active"
      >
        <Settings 
          :size="20" 
          class="shrink-0 opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
        />
        <span v-if="!collapsed" class="text-[13px] font-medium opacity-60 group-hover:opacity-100">Settings</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.nav-item-active {
  @apply !opacity-100;
}

.nav-item-active :deep(svg) {
  @apply opacity-100 scale-110;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

.nav-item-active span {
  @apply opacity-100;
}
</style>
