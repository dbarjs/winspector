import { defineCommand } from 'citty'
import { resolve } from 'pathe'
import { sharedArgs } from './_shared'

const command = defineCommand({
  meta: {
    name: 'init',
    description: 'Init a new project',
  },
  args: {
    ...sharedArgs,
    dir: {
      type: 'positional',
      description: 'Project directory',
      default: '',
    },
  },
  async run(context) {
    const cwd = resolve(context.args.cwd || '.')

    console.log('init', context.args.dir, cwd)

    // TODO: create init command
  },
})

export default command
