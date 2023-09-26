import { HookableHooks, Interceptor } from '../types'
import { getGlobalInterceptor } from './interceptor'
import { createListenerHooks } from './listeners'
import { createSafeRequest } from './safe-request'

export interface UseInterceptorOptions {
  baseUrl?: string
  interceptor?: Interceptor
}

export interface UseInterceptorReturn {
  interceptor: Interceptor
  hooks: HookableHooks
}

function composable(
  _globalThis: typeof globalThis,
  options: UseInterceptorOptions = {},
): UseInterceptorReturn {
  const { baseUrl, interceptor = getGlobalInterceptor(globalThis) } = options

  if (baseUrl) {
    _globalThis.Request = createSafeRequest(baseUrl)
  }

  const hooks = createListenerHooks(interceptor)

  return {
    interceptor,
    hooks,
  }
}

export function createComposable(
  _globalThis: typeof globalThis,
): (options?: UseInterceptorOptions) => UseInterceptorReturn {
  return (options?: UseInterceptorOptions) => {
    return composable(_globalThis, options)
  }
}
