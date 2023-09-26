import type { BatchInterceptor, HttpRequestEventMap } from '@mswjs/interceptors'
import type { ClientRequestInterceptor } from '@mswjs/interceptors/ClientRequest'
import type { FetchInterceptor } from '@mswjs/interceptors/fetch'
import type { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest'
import type { Hookable, HookKeys } from 'hookable'

export type BrowserInterceptor = BatchInterceptor<
  (FetchInterceptor | XMLHttpRequestInterceptor)[],
  HttpRequestEventMap
>

export type NodeInterceptor = BatchInterceptor<
  (ClientRequestInterceptor | FetchInterceptor | XMLHttpRequestInterceptor)[],
  HttpRequestEventMap
>

export type Interceptor = BrowserInterceptor | NodeInterceptor

export type RequestInput = URL | RequestInfo

export type RequestEvent = HttpRequestEventMap['request']['0']

export type ResponseEvent = HttpRequestEventMap['response']['0']

export type ListenerHooks = {
  request: (event: RequestEvent) => Promise<void> | void
  response: (event: ResponseEvent) => Promise<void> | void
}

export type HookableHooks = Hookable<ListenerHooks, HookKeys<ListenerHooks>>
