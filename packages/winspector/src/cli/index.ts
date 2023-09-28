import {
  defineCommand,
  runCommand as _runCommand,
  runMain as _runMain,
} from 'citty'
import { provider } from 'std-env'

import { fileURLToPath } from 'node:url'
import {} from 'citty'

import winspectorPkg from '../../package.json' assert { type: 'json' }
import { commands } from './commands'
import { setupGlobalConsole } from './utils/console'
import { checkEngines } from './utils/engines'

globalThis.__winspector_cli__ = globalThis.__winspector_cli__ || {
  // Programmatic usage fallback
  startTime: Date.now(),
  cwd: fileURLToPath(
    new URL(
      import.meta.url.endsWith('.ts') ? '../' : '../../',
      import.meta.url,
    ),
  ),
  entry: fileURLToPath(
    new URL(
      import.meta.url.endsWith('.ts')
        ? '../bin/winspector.mjs'
        : '../../bin/winspector.mjs',
      import.meta.url,
    ),
  ),
}

globalThis.__nuxt_cli__ = globalThis.__winspector_cli__

export async function runCommand(
  name: string,
  argv: string[] = process.argv.slice(2),
  data: { overrides?: Record<string, any> } = {},
) {
  argv.push('--no-clear') // Dev

  if (!(name in commands)) {
    throw new Error(`Invalid command ${name}`)
  }

  return await _runCommand(await commands[name as keyof typeof commands](), {
    rawArgs: argv,
    data: {
      overrides: data.overrides || {},
    },
  })
}

export const main = defineCommand({
  meta: {
    name: winspectorPkg.name,
    version: winspectorPkg.version,
    description: winspectorPkg.description,
  },
  args: {},
  subCommands: commands,
  async setup(context) {
    const command = context.args._[0]
    const dev = command === 'dev'

    setupGlobalConsole({ dev })

    // Check Node.js version and CLI updates in background
    let backgroundTasks: Promise<any> | undefined

    if (command !== '_dev' && provider !== 'stackblitz') {
      backgroundTasks = Promise.all([
        checkEngines(),
        // checkForUpdates(),
      ]).catch((err) => console.error(err))
    }

    // Avoid background check to fix prompt issues
    if (command === 'init') {
      await backgroundTasks
    }
  },
}) as any /* TODO: Fix rollup type inline issue */

export const runMain = () => _runMain(main)
