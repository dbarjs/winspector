export default defineNuxtConfig({
  modules: ['../src/module'],
  winspector: {
    isEnabled: true,
    baseUrl: 'http://localhost:3000',
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
