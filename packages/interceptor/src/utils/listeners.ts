import { createHooks } from 'hookable'

import {
  Interceptor,
  ListenerHooks,
  RequestEvent,
  HookableHooks,
} from '../types'

function requestListener({ request }: RequestEvent) {
  console.log('Request intercepted by winspector!', request.url)
}

export function createListenerHooks(
  interceptor: Interceptor,
  label?: string,
): {
  hooks: HookableHooks
} {
  const hooks = createHooks<ListenerHooks>()

  hooks.hook('request', requestListener)

  interceptor.on('request', (event) => {
    console.log('Request: ', label)

    hooks.callHook('request', event)
  })

  interceptor.on('response', (event) => {
    hooks.callHook('response', event)
  })

  return hooks
}
