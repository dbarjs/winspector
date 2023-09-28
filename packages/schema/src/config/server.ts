import { defineUntypedSchema } from 'untyped'

export default defineUntypedSchema({
  port:
    process.env.WINSPECTOR_PORT ||
    process.env.NITRO_PORT ||
    process.env.PORT ||
    4000,
})
