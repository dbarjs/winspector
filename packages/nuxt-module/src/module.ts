import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerPlugin,
  addServerHandler,
} from '@nuxt/kit'
import { defu } from 'defu'
import { useInterceptor } from '@winspector/interceptor'

export interface ModuleOptions {
  isEnabled: boolean
  isDebugEnabled?: boolean
  appBaseUrl?: string
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
    const runtimeConfig =
      (nuxt.options.runtimeConfig.winspector as ModuleOptions) || {}
    const options = defu(inlineOptions, runtimeConfig, {
      appBaseUrl: 'http://localhost',
      isEnabled: process.env.NODE_ENV === 'development',
    })

    if (!options.isEnabled) {
      return
    }

    nuxt.options.runtimeConfig.public.winspector = options

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
        config: {
          appBaseUrl: options.appBaseUrl,
          isDebugEnabled: options.isDebugEnabled,
          label: 'Nuxt Module',
        },
      })
    })
  },
})

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    winspector: ModuleOptions
  }
}
