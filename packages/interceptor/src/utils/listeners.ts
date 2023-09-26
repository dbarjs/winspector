import { createHooks } from 'hookable'

import {
  Interceptor,
  ListenerHooks,
  RequestEvent,
  HookableHooks,
} from '../types'

function getRequestCookie(
  request: RequestEvent['request'],
): string | undefined {
  const cookieHeader = request.headers.get('cookie')

  if (!cookieHeader?.includes('context-id')) {
    return
  }

  const contextIdCookie = cookieHeader
    .split(';')
    .find((cookie) => cookie.includes('context-id'))

  if (!contextIdCookie) {
    return
  }

  const [key, value] = contextIdCookie.split('=')

  if (key !== 'context-id' || !value) {
    return
  }

  return value
}

function requestListener({ request }: RequestEvent) {
  if (request.headers.has('x-context-id')) {
    return
  }

  const value = getRequestCookie(request)

  if (!value) {
    return
  }

  request.headers.set('x-context-id', value)
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

  return { hooks }
}
