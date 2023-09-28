import { HookableHooks, Interceptor, Config } from '../types'
import { getGlobalInterceptor } from './interceptor'
import { createListenerHooks } from './listeners'
import { createSafeRequest } from './safe-request'

export interface UseInterceptorOptions {
  config?: Config
  interceptor?: Interceptor
}

export interface UseInterceptorReturn {
  hooks: HookableHooks
  interceptor: Interceptor
  setConfig: (config: Config) => void
}

function composable(
  _globalThis: typeof globalThis,
  options: UseInterceptorOptions = {},
): UseInterceptorReturn {
  const { config = {}, interceptor = getGlobalInterceptor(globalThis) } =
    options

  const { hooks } = createListenerHooks(interceptor)

  hooks.hook('request', ({ request }) => {
    if (config.isDebugEnabled) {
      const label = config.label || 'winspector'

      console.log(`[${label}]`, request.url)
    }
  })

  const setConfig = ({
    appBaseUrl,
    isDebugEnabled,
    label,
  }: Config = {}): void => {
    if (appBaseUrl) {
      config.appBaseUrl = appBaseUrl

      _globalThis.Request = createSafeRequest(appBaseUrl)
    }

    if (isDebugEnabled) {
      config.isDebugEnabled = isDebugEnabled
    }

    if (label) {
      config.label = label
    }
  }

  setConfig(config)

  return {
    hooks,
    interceptor,
    setConfig,
  }
}

export function createComposable(
  _globalThis: typeof globalThis,
): (options?: UseInterceptorOptions) => UseInterceptorReturn {
  return (options?: UseInterceptorOptions) => {
    return composable(_globalThis, options)
  }
}
