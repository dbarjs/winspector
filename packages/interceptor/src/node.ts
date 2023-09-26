import { ClientRequestInterceptor } from '@mswjs/interceptors/lib/node/interceptors/ClientRequest'
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/lib/node/interceptors/XMLHttpRequest'
import { FetchInterceptor } from '@mswjs/interceptors/lib/node/interceptors/fetch'

import { createComposable, createInterceptor } from './utils'
import { createNodeFetch } from './utils/node-fetch'

globalThis.fetch = globalThis.fetch || createNodeFetch()

const create = () =>
  createInterceptor([
    new ClientRequestInterceptor(),
    new XMLHttpRequestInterceptor(),
    new FetchInterceptor(),
  ])

// @ts-expect-error
globalThis.interceptor = globalThis.interceptor || create()

export const useInterceptor = createComposable(globalThis)
