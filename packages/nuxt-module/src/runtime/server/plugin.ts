import { useInterceptor } from '@winspector/interceptor'

export default defineNitroPlugin(() => {
  useInterceptor({
    baseUrl: 'http://localhost:3000',
    label: 'Nitro Plugin',
  })
})
