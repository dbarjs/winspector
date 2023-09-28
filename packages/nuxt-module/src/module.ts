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

    const options = defu(
      inlineOptions,
      (nuxt.options.runtimeConfig.public.winspector as ModuleOptions) || {},
    )

    options.appBaseUrl =
      options.appBaseUrl || `http://localhost:${nuxt.options.devServer.port}`

    nuxt.options.runtimeConfig.public.winspector = options

    if (!options.isEnabled) {
      return
    }

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
