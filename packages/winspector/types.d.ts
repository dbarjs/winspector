/* eslint-disable no-var */

declare global {
  var __WINSPECTOR_PREPATHS__: undefined | string[]
  var __WINSPECTOR_PATHS__: undefined | string[]
  var __winspector_cli__:
    | undefined
    | {
        entry: string
        startTime: number
        cwd: string
      }
  var __nuxt_cli__: typeof __winspector_cli__
}

export {}
