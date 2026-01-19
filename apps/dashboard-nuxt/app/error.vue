<script setup lang="ts">
import { ChevronDown, ChevronRight, Terminal, Home, AlertTriangle, Cpu } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })

const viewAllFrames = ref(false)
const themeMode = ref('pretty') // 'pretty' | 'raw'

// Mock stack trace for visualization to match the user's requested UI exactly
const stackFrames = [
  { 
    file: 'node_modules/h3/dist/index.mjs', 
    function: 'createError', 
    line: '71:15', 
    active: true, 
    code: [
      { n: 66, content: '    return new H3Error(input);', active: false },
      { n: 67, content: '  }', active: false },
      { n: 68, content: '  if (isError(input)) {', active: false },
      { n: 69, content: '    return input;', active: false },
      { n: 70, content: '  }', active: false },
      { n: 71, content: '  const err = new H3Error(input.message ?? input.statusMessage ?? "", {', active: true },
      { n: 72, content: '    cause: input.cause || input', active: false },
      { n: 73, content: '  });', active: false },
      { n: 74, content: '  if (hasProp(input, "stack")) {', active: false },
      { n: 75, content: '    try {', active: false },
      { n: 76, content: '      Object.defineProperty(err, "stack", {', active: false },
    ]
  },
  { file: 'node_modules/@nuxt/vite-builder/dist/index.mjs', function: 'processMessage', line: '423:21', active: false },
  { file: 'node_modules/@nuxt/vite-builder/dist/index.mjs', function: 'async processMessage', line: '405:30', active: false },
]
</script>

<template>
  <div class="min-h-screen bg-perplexity-bg text-perplexity-text p-6 md:p-12 font-sans selection:bg-white/10 selection:text-white">
    <div class="max-w-6xl mx-auto space-y-12">
      <!-- System Header -->
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-perplexity-border pb-12">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span class="text-[13px] font-semibold text-red-500/80">Critical system failure</span>
          </div>
          <h1 class="text-6xl font-bold tracking-tight text-white leading-none">Error <span class="text-white/20">500</span></h1>
          <div class="flex items-center gap-4">
            <span class="text-[11px] text-perplexity-text-muted tracking-wide leading-none">Timestamp: <span class="text-white/60 font-semibold">{{ new Date().toISOString().split('T')[1].split('.')[0] }}</span></span>
          </div>
        </div>
        
        <button 
          @click="handleError"
          class="px-8 py-3 bg-white text-black rounded-full font-medium text-[13px] hover:bg-white/90 transition-all flex items-center gap-2 active:scale-95 shadow-glow-white/10"
        >
          <Home :size="14" /> Return to Dashboard
        </button>
      </header>

      <main class="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        <!-- Stack Trace Engine -->
        <div class="lg:col-span-3 space-y-6">
          <div class="flex items-center justify-between px-2">
            <h2 class="text-[13px] font-semibold text-perplexity-text-muted flex items-center gap-3">
              <Cpu :size="14" class="text-perplexity-text-muted" /> Stack trace
            </h2>
            
            <div class="flex items-center gap-6">
              <!-- View All Frames Checkbox -->
              <label class="flex items-center gap-3 cursor-pointer group select-none">
                <div class="relative w-4 h-4 rounded border border-white/20 group-hover:border-white/40 transition-colors flex items-center justify-center bg-white/[0.02]">
                  <input type="checkbox" v-model="viewAllFrames" class="absolute inset-0 opacity-0 cursor-pointer">
                  <div v-if="viewAllFrames" class="w-1.5 h-1.5 bg-green-500 rounded-sm shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                </div>
                <span class="text-[11px] font-semibold text-perplexity-text-muted group-hover:text-white/70 transition-colors">View all frames</span>
              </label>

              <!-- Pretty/Raw Toggle -->
              <div class="flex bg-white/[0.03] border border-white/10 rounded-md p-1">
                <button 
                  @click="themeMode = 'pretty'"
                  :class="[
                    'px-4 py-1.5 rounded text-[11px] font-semibold transition-all',
                    themeMode === 'pretty' ? 'bg-white/10 text-white shadow-inner' : 'text-perplexity-text-muted hover:text-white/60'
                  ]"
                >
                  Pretty
                </button>
                <button 
                  @click="themeMode = 'raw'"
                  :class="[
                    'px-4 py-1.5 rounded text-[11px] font-semibold transition-all',
                    themeMode === 'raw' ? 'bg-white/10 text-white shadow-inner' : 'text-perplexity-text-muted hover:text-white/60'
                  ]"
                >
                  Raw
                </button>
              </div>
            </div>
          </div>

          <!-- Stack Trace List -->
          <div class="space-y-4">
            <div 
              v-for="(frame, idx) in stackFrames" 
              :key="idx"
              class="stack-trace-box"
              :class="{ 'ring-1 ring-white/10': frame.active }"
            >
              <div class="stack-trace-header">
                <div>
                  <span class="text-green-500 font-bold block mb-1 text-[12px] opacity-90">{{ frame.file }}</span>
                  <div class="text-white/30 text-[11px] flex items-center gap-2">
                    in <span class="text-white/80 font-bold font-mono">{{ frame.function }}</span>
                    <span class="opacity-20">|</span>
                    at line <span class="text-white/80 font-bold font-mono">{{ frame.line }}</span>
                  </div>
                </div>
                <button class="text-white/10 hover:text-white/30 transition-colors p-2">
                  <ChevronDown v-if="frame.active" :size="20" />
                  <ChevronRight v-else :size="20" />
                </button>
              </div>

              <!-- Code Preview Display -->
              <div v-if="frame.active" class="py-6 bg-black/40 overflow-x-auto">
                <div 
                  v-for="line in frame.code" 
                  :key="line.n"
                  class="line-content relative"
                  :class="{ 'line-active': line.active }"
                >
                  <span class="line-number">{{ line.n }}</span>
                  <span class="text-white/70 relative z-10">{{ line.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Diagnostics Sidebar -->
        <aside class="space-y-10">
          <div class="space-y-5">
            <h2 class="text-[13px] font-semibold text-perplexity-text-muted border-l-2 border-perplexity-border pl-4">
              Runtime diagnostics
            </h2>
            <div class="grid grid-cols-1 gap-4">
              <div class="p-5 bg-white/[0.02] border border-white/[0.05] rounded-xl group hover:border-white/10 transition-colors">
                <p class="text-[11px] text-perplexity-text-muted mb-2 font-medium">Protocol</p>
                <p class="font-bold text-white/80 text-[13px]">Nuxt Engine v3.12.0</p>
                <div class="w-full h-1 bg-white/5 mt-3 rounded-full overflow-hidden">
                  <div class="w-full h-full bg-green-500/40"></div>
                </div>
              </div>
              <div class="p-5 bg-white/[0.02] border border-perplexity-border rounded-xl group hover:border-white/10 transition-colors">
                <p class="text-[11px] text-perplexity-text-muted mb-2 font-medium">Security context</p>
                <p class="font-bold text-green-500 text-[13px]">Stable recovery mode</p>
                <p class="text-[11px] text-perplexity-text-muted mt-1 font-medium">Isolation level: level 4 assets</p>
              </div>
            </div>
          </div>

          <div class="space-y-5">
            <h2 class="text-[13px] font-semibold text-perplexity-text-muted border-l-2 border-perplexity-border pl-4">
              Error investigation
            </h2>
            <div class="p-5 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-[11px] leading-relaxed text-white/40 group hover:text-white/60 transition-colors">
               <span class="text-red-500/50">></span> Investigating memory leak... <br>
               <span class="text-red-500/50">></span> Cache trace corrupted. <br>
               <span class="text-white/10">------------------------</span> <br>
               <span class="text-red-500">Error:</span> {{ error?.message }} <br>
               <div class="mt-4 flex flex-col gap-1 text-[10px]">
                 <span class="text-white/15 hover:text-white/40 transition-colors cursor-pointer">at handleFetch (core/network.ts)</span>
                 <span class="text-white/15 hover:text-white/40 transition-colors cursor-pointer">at processLayer (core/logic.ts)</span>
               </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="p-5 bg-green-500/[0.03] border border-green-500/10 rounded-xl">
             <p class="text-[13px] font-semibold text-green-500 mb-3 ml-1">Self-repair</p>
             <button class="w-full py-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-full text-[11px] font-semibold transition-all border border-green-500/20 active:scale-95">
               Flush core cache
             </button>
          </div>
        </aside>
      </main>

      <!-- Footer Metatada -->
      <footer class="pt-10 border-t border-white/5 flex flex-wrap gap-10 opacity-30">
        <div v-for="tag in ['id_x99', 'layer_8', 'memory_stable', 'node_sync']" :key="tag" class="text-[11px] font-semibold text-perplexity-text-muted">
          {{ tag }}
        </div>
      </footer>

    </div>
  </div>
</template>

<style scoped>
.line-content {
  display: block;
}

.line-content::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
