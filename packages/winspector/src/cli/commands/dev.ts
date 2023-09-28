import { defineCommand } from 'citty'
import { getArgs as getListhenArgs } from 'listhen/cli'
import { isBun, isTest } from 'std-env'
import { runCommand } from 'nuxi'

import { sharedArgs } from './_shared'
import { nuxtConfig } from '../../nuxt/config'
import { showVersions } from '../utils/banner'
import { overrideEnv } from '../utils/env'

const isForkSupported = !!isBun || !isTest

const command = defineCommand({
  meta: {
    name: 'dev',
    description: 'Starts the development server',
  },
  args: {
    ...sharedArgs,
    ...getListhenArgs(),
    dotenv: {
      type: 'string',
      description: 'Path to .env file',
    },
    clear: {
      type: 'boolean',
      description: 'Clear console on restart',
    },
    fork: {
      type: 'boolean',
      description: isForkSupported
        ? 'Disable forked mode'
        : 'Enable forked mode',
      default: isForkSupported,
    },
  },
  async run(context) {
    overrideEnv('development')

    const cwd = globalThis.__nuxt_cli__?.cwd

    if (!cwd) {
      throw new Error(`Invalid cwd`)
    }

    showVersions(cwd)

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
