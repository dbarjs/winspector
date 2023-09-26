import http from 'node:http'
import https, { AgentOptions } from 'node:https'
import nodeFetch from 'node-fetch-native'
import { RequestInput } from '../types'

export function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || 'false')

  if (!useKeepAlive) {
    return nodeFetch
  }

  // https://github.com/node-fetch/node-fetch#custom-agent
  const agentOptions: AgentOptions = { keepAlive: true }
  const httpAgent = new http.Agent(agentOptions)
  const httpsAgent = new https.Agent(agentOptions)
  const nodeFetchOptions = {
    agent(parsedURL: any) {
      return parsedURL.protocol === 'http:' ? httpAgent : httpsAgent
    },
  }

  return function nodeFetchWithKeepAlive(
    input: RequestInput,
    init?: RequestInit,
  ) {
    return (nodeFetch as any)(input, { ...nodeFetchOptions, ...init })
  }
}
