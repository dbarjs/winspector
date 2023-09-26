import type { ClientRequestInterceptor } from '@mswjs/interceptors/ClientRequest'
import type { FetchInterceptor } from '@mswjs/interceptors/fetch'
import type { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest'
import { BatchInterceptor } from '@mswjs/interceptors'

import { Interceptor } from '../types'

type AvaiableInterceptors =
  | ClientRequestInterceptor
  | FetchInterceptor
  | XMLHttpRequestInterceptor

export function createInterceptor(
  interceptors: AvaiableInterceptors[],
): Interceptor {
  const interceptor = new BatchInterceptor({
    name: 'winspector-interceptor',
    interceptors,
  })

  interceptor.apply()

  return interceptor
}

export function getGlobalInterceptor(global: typeof globalThis): Interceptor {
  // @ts-expect-error
  return global.interceptor
}
