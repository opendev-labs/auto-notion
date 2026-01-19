// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Missions Control | Auto-Notion Stack',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBMsqr--MMnif5HrvtcTvoPyIkqHznuqkg",
        authDomain: "meta-auto-notion.firebaseapp.com",
        projectId: "meta-auto-notion",
        storageBucket: "meta-auto-notion.firebasestorage.app",
        messagingSenderId: "357502904034",
        appId: "1:357502904034:web:817d672e8947ef6afaa0bb",
        measurementId: "G-XNBEM9HKV0"
      }
    }
  },
  future: {
    compatibilityVersion: 4,
  }
})
