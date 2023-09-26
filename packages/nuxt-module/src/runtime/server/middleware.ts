import { useInterceptor } from '@winspector/interceptor'

useInterceptor({
  baseUrl: 'http://localhost:3000',
  label: 'Nitro Middleware',
})

export default defineEventHandler(() => {})
