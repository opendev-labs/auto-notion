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
                },
                institutional: {
                    indigo: '#6366f1',
                    blue: '#3b82f6',
                    gold: '#d4af37',
                }
            },
            backdropBlur: {
                xs: '2px',
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
