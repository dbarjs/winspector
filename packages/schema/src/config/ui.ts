import { defineUntypedSchema } from 'untyped'

export default defineUntypedSchema({
  ui: {
    port: process.env.WINSPECTOR_UI_PORT || process.env.UI_PORT || 5000,
  },
})
