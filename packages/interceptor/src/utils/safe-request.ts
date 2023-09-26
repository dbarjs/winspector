import { parseURL } from 'ufo'

import type { RequestInput } from '../types'

export function createSafeRequest(baseUrl: string): typeof Request {
  const isValidInput = (input: RequestInput): input is URL | RequestInfo => {
    if (input instanceof URL || input instanceof Request) {
      return true
    }

    try {
      new URL(input)

      return true
    } catch {
      return false
    }
  }

  const getSafeUrl = (input: string): URL => {
    if (!input) {
      return new URL(baseUrl)
    }

    const parsedUrl = parseURL(input)

    if (parsedUrl && !parsedUrl.host) {
      return new URL(input, baseUrl)
    }

    return new URL(baseUrl)
  }

  const getSafeInput = (input: RequestInput): RequestInput => {
    if (isValidInput(input)) {
      return input
    }

    return getSafeUrl(input)
  }

  class SafeRequest extends Request {
    constructor(input: RequestInput, init?: RequestInit) {
      const safeInput = getSafeInput(input)

      super(safeInput, init)
    }
  }

  return SafeRequest
}
