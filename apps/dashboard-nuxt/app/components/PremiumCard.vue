<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

interface Stat {
  label: string
  value: string | number
}

interface Props {
  title: string
  subtitle?: string
  description?: string
  icon: any
  iconGradient?: string
  status?: string
  statusColor?: 'green' | 'yellow' | 'red' | 'indigo' | 'white'
  stats? : Stat[]
  actionLabel?: string
  actionPath?: string
  actionIcon?: any
  externalLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconGradient: 'from-green-500 to-indigo-500',
  statusColor: 'green',
  actionLabel: 'Initialize Logic'
})

defineEmits(['action'])

const statusColors = {
  green: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]',
  yellow: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]',
  red: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
  indigo: 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]',
  white: 'bg-white/20'
}

const statusTextColors = {
  green: 'text-green-500/80',
  yellow: 'text-yellow-500/80',
  red: 'text-red-500/80',
  indigo: 'text-indigo-500/80',
  white: 'text-white/40'
}
</script>

<template>
  <div 
    class="bg-perplexity-surface/50 border border-perplexity-border rounded-2xl group transition-all duration-300 hover:border-white/20 relative overflow-hidden flex flex-col h-full hover:shadow-glow-white/5"
  >
    <!-- Card Header -->
    <div class="px-8 pt-8 flex justify-between items-start relative z-10">
      <div class="flex items-center gap-5">
        <div class="w-10 h-10 flex items-center justify-center transition-all duration-300 relative text-perplexity-text-muted group-hover:text-white">
          <component :is="icon" :size="24" class="transition-all duration-300 group-hover:scale-110" />
        </div>
        
        <div class="space-y-0.5">
          <h3 class="text-lg font-semibold text-perplexity-text tracking-tight leading-tight group-hover:text-white transition-colors">
            {{ title }}
          </h3>
          <p class="text-[12px] text-perplexity-text-muted font-normal leading-tight">
            {{ description || 'Integrated automation node' }}
          </p>
        </div>
      </div>

      <NuxtLink
        v-if="actionPath"
        :to="actionPath"
        class="w-8 h-8 rounded-full border border-perplexity-border flex items-center justify-center text-perplexity-text-muted hover:text-white hover:border-white/30 transition-all duration-300"
      >
        <ArrowUpRight :size="16" />
      </NuxtLink>
    </div>

    <!-- Status Badge (Minimal) -->
    <div v-if="status" class="px-8 mt-4 relative z-10">
      <div 
        class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-medium"
        :class="[
          statusColor === 'green' ? 'bg-green-500/5 text-green-500 border-green-500/10' :
          statusColor === 'red' ? 'bg-red-500/5 text-red-500 border-red-500/10' :
          'bg-white/5 text-white/40 border-white/10'
        ]"
      >
        <div class="w-1 h-1 rounded-full bg-current" />
        {{ status }}
      </div>
    </div>

    <!-- Custom Content Slot -->
    <div class="px-8 relative z-10 mb-8 flex-1 mt-6">
      <slot />
    </div>

    <!-- Stats Row (Minimal) -->
    <div v-if="stats && stats.length > 0" class="px-8 py-5 border-t border-perplexity-border relative z-10 mt-auto flex gap-8">
      <div 
        v-for="(stat, idx) in stats" 
        :key="idx" 
        class="space-y-0.5"
      >
        <p class="text-[10px] text-perplexity-text-muted uppercase tracking-wider font-medium opacity-60">{{ stat.label }}</p>
        <h4 class="text-[14px] font-semibold text-perplexity-text">{{ stat.value }}</h4>
      </div>
    </div>

    <!-- Action Bar (Minimal) -->
    <NuxtLink 
      v-if="actionPath"
      :to="actionPath" 
      class="w-full block py-4 bg-white/[0.02] border-t border-perplexity-border text-[11px] font-medium text-perplexity-text-muted hover:text-white hover:bg-white/[0.05] transition-all duration-200 text-center relative z-10"
    >
      {{ actionLabel }}
    </NuxtLink>
    <button
      v-else
      @click="$emit('action')"
      class="w-full block py-4 bg-white/[0.02] border-t border-perplexity-border text-[11px] font-medium text-perplexity-text-muted hover:text-white hover:bg-white/[0.05] transition-all duration-200 text-center relative z-10"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
