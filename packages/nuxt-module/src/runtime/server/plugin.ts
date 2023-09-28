import { useInterceptor } from '@winspector/interceptor'

export default defineNitroPlugin(() => {
  const config = useRuntimeConfig()

  useInterceptor({
    config: {
      appBaseUrl: config.public.winspector.appBaseUrl,
      isDebugEnabled: config.public.winspector.isDebugEnabled,
      label: 'Nitro Plugin',
    },
  })
})
