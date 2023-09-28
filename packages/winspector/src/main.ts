import { defineCommand } from 'citty'
import { provider } from 'std-env'

import winspectorPkg from '../package.json' assert { type: 'json' }
import { commands } from './commands'
import { setupGlobalConsole } from './utils/console'
import { checkEngines } from './utils/engines'

export const main = defineCommand({
  meta: {
    name: winspectorPkg.name,
    version: winspectorPkg.version,
    description: winspectorPkg.description,
  },
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
})
