/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
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
                institutional: {
                    indigo: '#6366f1',
                    blue: '#3b82f6',
                    gold: '#d4af37',
                    ash: '#1a1a1a',
                },
                integration: {
                    earth: '#8B7355',    // Earthy brown
                    sage: '#9CAF88',     // Sage green  
                    lotus: '#E8D5C4',    // Lotus cream
                    cosmic: '#4A5568',   // Deep cosmic grey
                    gold: '#D4AF37',     // Sacred gold
                    amber: '#F59E0B',    // Warm amber
                    indigo: '#818CF8',   // Soft indigo
                }
            },
            backdropBlur: {
                xs: '2px',
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            borderRadius: {
                '3xl': '1.5rem',
                '4xl': '2rem',
                '5xl': '3rem',
            },
            borderWidth: {
                '0.5': '0.5px',
            }
        },
    },
    plugins: [],
}
