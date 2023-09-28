import { defineUntypedSchema } from 'untyped'

export default defineUntypedSchema({
  destination: {
    baseUrl:
      process.env.WINSPECTOR_DESTINATION_BASE_URL ||
      process.env.DESTINATION_BASE_URL,
  },
})
