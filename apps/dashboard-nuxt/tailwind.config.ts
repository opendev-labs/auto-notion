import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                zen: {
                    sage: '#94a3b8',
                    sand: '#d4af37',
                    slate: '#0f172a',
                    clay: '#a45c40',
                    bone: '#000000',
                    dark: '#050505',
                    black: '#000000',
                    void: '#020202',
                },
                perplexity: {
                    bg: '#0d0d0d',
                    surface: '#18181a',
                    border: 'rgba(255, 255, 255, 0.06)',
                    text: '#e3e3e3',
                    'text-muted': '#9ea1a1',
                    brand: '#ffffff',
                },
                nuxtgen: {
                    bg: '#080808',
                    surface: '#111111',
                    'surface-light': '#181818',
                    border: 'rgba(255, 255, 255, 0.08)',
                    'border-light': 'rgba(255, 255, 255, 0.12)',
                    green: '#22c55e',
                    red: '#ef4444',
                    'red-muted': 'rgba(239, 68, 68, 0.1)',
                    'red-dark': 'rgba(239, 68, 68, 0.2)',
                    text: '#ffffff',
                    'text-muted': 'rgba(255, 255, 255, 0.4)',
                    'text-dim': 'rgba(255, 255, 255, 0.2)',
                },
                institutional: {
                    indigo: '#6366f1',
                    blue: '#3b82f6',
                    gold: '#d4af37',
                    ash: '#1a1a1a',
                },
                integration: {
                    earth: '#8B7355',
                    sage: '#9CAF88',
                    lotus: '#E8D5C4',
                    cosmic: '#4A5568',
                    gold: '#D4AF37',
                    amber: '#F59E0B',
                    indigo: '#818CF8',
                }
            },
            fontFamily: {
                primary: ['Instrument Sans', 'Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
                nuxt: ['Instrument Sans', 'sans-serif'],
            },
            borderWidth: {
                '0.5': '0.5px',
            },
            boxShadow: {
                'premium': '0 20px 50px rgba(0, 0, 0, 0.5)',
                'inner-premium': 'inset 0 0 20px rgba(255, 255, 255, 0.02)',
                'glow-green': '0 0 15px rgba(34, 197, 94, 0.6)',
                'glow-white': '0 0 30px rgba(255, 255, 255, 0.1)',
                'glow-red': '0 0 20px rgba(239, 68, 68, 0.3)',
            }
        }
    }
}
