import { NuxtConfig } from '@nuxt/schema'

export const nuxtConfig: NuxtConfig = {
  app: {
    head: {
      title: 'Winspector UI',
    },
  },
  hooks: {
    ready: (nuxtApp) => {
      console.log(nuxtApp.options.app.head)
    },
  },
  modules: ['../src/module.ts'],
}
