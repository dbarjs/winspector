export default defineEventHandler(async (event) => {
  const contentId = getHeader(event, 'x-context-id') || null

  const fetcher = $fetch.create({
    baseURL: 'http://localhost:4444',
  })

  const data = await fetcher('/teste')

  return {
    message: 'Hello World!',
    'x-content-id': contentId,
    response: data,
  }
})
