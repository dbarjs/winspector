export default defineNuxtConfig({
  modules: ['../src/module'],
  winspector: {
    isEnabled: true,
    appBaseUrl: 'http://localhost:3000',
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:4444',
    },
  },
  devtools: {
    enabled: false,
  },
  routeRules: {
    '/api/**': {
      cache: false,
    },
  },
})
