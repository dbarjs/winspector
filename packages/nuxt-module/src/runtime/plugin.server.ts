import { defineNuxtPlugin, useCookie } from '#app'

import { useInterceptor } from '@winspector/interceptor'

const { setConfig } = useInterceptor({
  config: {
    label: 'Nuxt Server Plugin',
  },
})

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  setConfig({
    appBaseUrl: config.public.winspector.appBaseUrl,
  })

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
})
