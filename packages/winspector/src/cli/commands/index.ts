import type { CommandDef } from 'citty'

const _rDefault = (r: any) => (r.default || r) as Promise<CommandDef>

export const commands = {
  _dev: () => import('./dev-child').then(_rDefault),
  dev: () => import('./dev').then(_rDefault),
  init: () => import('./init').then(_rDefault),
}
