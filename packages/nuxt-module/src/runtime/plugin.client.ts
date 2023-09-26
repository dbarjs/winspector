import { defineNuxtPlugin, useCookie } from '#app'
import { useInterceptor } from '@winspector/interceptor'

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

  const { hooks } = useInterceptor({
    baseUrl: 'http://localhost:3000',
  })

  hooks.hook('request', ({ request }) => {
    if (!contextId.value) {
      return
    }

    request.headers.set('x-context-id', contextId.value)
  })
})
