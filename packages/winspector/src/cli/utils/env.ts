export const overrideEnv = (targetEnv: string) => {
  const currentEnv = process.env.NODE_ENV
  if (currentEnv && currentEnv !== targetEnv) {
    console.warn(
      `Changing \`NODE_ENV\` from \`${currentEnv}\` to \`${targetEnv}\`, to avoid unintended behavior.`,
    )
  }

  process.env.NUXT_TELEMETRY_DISABLED = '1'
  process.env.NODE_ENV = targetEnv
}
