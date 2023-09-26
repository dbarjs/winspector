import { defineNuxtPlugin, useCookie } from '#app'

import { useInterceptor } from '@winspector/interceptor'

useInterceptor({
  baseUrl: 'http://localhost:3000',
  label: 'Nuxt Server Plugin',
})

export default defineNuxtPlugin(() => {
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
