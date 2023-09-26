import { FetchInterceptor } from '@mswjs/interceptors/fetch'
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest'

import { createComposable, createInterceptor } from './utils'

// ref: https://github.com/tc39/proposal-global
const _globalThis = (function () {
  if (typeof globalThis !== 'undefined') {
    return globalThis
  }

  if (typeof self !== 'undefined') {
    return self
  }

  if (typeof window !== 'undefined') {
    return window
  }

  if (typeof global !== 'undefined') {
    return global
  }

  throw new Error('unable to locate global object')
})()

const create = () =>
  createInterceptor([new XMLHttpRequestInterceptor(), new FetchInterceptor()])

// @ts-expect-error
_globalThis.interceptor = _globalThis.interceptor || create()

export const useInterceptor = createComposable(_globalThis)
