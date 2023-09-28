import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule((options, nuxt) => {
  nuxt.hook('pages:extend', (pages) => {
    console.log(`Discovered ${pages.length} pages`)
  })
})
