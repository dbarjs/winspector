import {
  createApp,
  eventHandler,
  toNodeListener,
  getHeaders,
  handleCors,
} from 'h3'
import { listen } from 'listhen'

const app = createApp()

app.use(
  '/teste',
  eventHandler((event) => {
    handleCors(event, {
      origin: '*',
    })

    return {
      result: 'Hello world!',
      headers: getHeaders(event),
      raw: event.node.req.rawHeaders,
    }
  }),
)

listen(toNodeListener(app), {
  port: 4444,
})
