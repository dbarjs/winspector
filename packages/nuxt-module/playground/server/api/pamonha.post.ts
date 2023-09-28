export default defineEventHandler(async (event) => {
  const contentId = getHeader(event, 'x-context-id') || null
  const config = useRuntimeConfig()

  const fetcher = $fetch.create({
    baseURL: config.public.apiBaseUrl,
  })

  const data = await fetcher('/teste')

  return {
    message: 'Hello World!',
    'x-content-id': contentId,
    response: data,
  }
})
