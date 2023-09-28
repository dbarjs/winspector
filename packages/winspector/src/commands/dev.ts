import { defineCommand } from 'citty'

const command = defineCommand({
  meta: {
    name: 'dev',
    description: 'Starts the development server',
  },
  async run() {},
})

export default command
