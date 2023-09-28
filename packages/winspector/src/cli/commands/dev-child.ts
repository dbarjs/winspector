import { defineCommand } from 'citty'
import { runCommand } from 'nuxi'

import { sharedArgs } from './_shared'
import { overrideEnv } from '../utils/env'
import { nuxtConfig } from '../../nuxt/config'

const command = defineCommand({
  meta: {
    name: '_dev',
    description: 'Run child development server',
  },
  args: {
    ...sharedArgs,
  },
  async run(context) {
    overrideEnv('development')

    const cwd = globalThis.__nuxt_cli__?.cwd

    if (!cwd) {
      throw new Error(`Invalid cwd`)
    }

    context.args.cwd = cwd
    context.args.rootDir = cwd
    process.argv = []

    runCommand('_dev', ['--cwd', cwd], {
      overrides: {
        cwd,
        ...nuxtConfig,
      },
    })
  },
})

export default command
