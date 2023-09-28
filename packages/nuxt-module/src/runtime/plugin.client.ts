import { defineNuxtPlugin, useCookie } from '#app'
import { useInterceptor } from '@winspector/interceptor'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const contextId = useCookie('context-id')

  globalThis.$fetch = globalThis.$fetch.create({
    onRequest({ options }) {
      if (!contextId.value) {
        return
      }

      options.headers = {
        ...options.headers,
        'x-context-id': contextId.value,
      }
    },
  })

  const { hooks } = useInterceptor({
    config: {
      isDebugEnabled: true,
      appBaseUrl: config.public.winspector.appBaseUrl,
      label: 'Nuxt Client Plugin',
    },
  })

  hooks.hook('request', ({ request }) => {
    if (!contextId.value) {
      return
    }

    request.headers.set('x-context-id', contextId.value)
  })
})
