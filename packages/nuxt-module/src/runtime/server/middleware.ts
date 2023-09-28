import { useInterceptor } from '@winspector/interceptor'

const { setConfig } = useInterceptor({
  config: {
    label: 'Nitro Middleware',
  },
})

export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  setConfig({
    isDebugEnabled: config.public.winspector.isDebugEnabled,
    appBaseUrl: config.public.winspector.appBaseUrl,
  })
})
