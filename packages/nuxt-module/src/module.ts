import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerPlugin,
  addServerHandler,
} from '@nuxt/kit'

import { useInterceptor } from '@winspector/interceptor'

export interface ModuleOptions {
  isEnabled: boolean
  baseUrl?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@winspector/nuxt',
    configKey: 'winspector',
  },
  defaults: {
    isEnabled: false,
  },
  setup(inlineOptions, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin.client'))
    addPlugin(resolver.resolve('./runtime/plugin.server'))
    addServerPlugin(resolver.resolve('./runtime/server/plugin'))
    addServerHandler({
      handler: resolver.resolve('./runtime/server/middleware'),
    })

    nuxt.hook('vite:serverCreated', () => {
      if ('interceptor' in globalThis) {
        return
      }

      useInterceptor({
        baseUrl: inlineOptions.baseUrl,
        label: 'Nuxt Module',
      })
    })
  },
})
