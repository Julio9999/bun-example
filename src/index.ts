import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'
import type { ServerWebSocket } from 'bun'
import { authMiddleware } from './middleware/auth';
import { users } from './modules/users/users-routes';
import { authRoutes } from './modules/auth/auth-routes';
import { boardRoutes } from './modules/boards/boards-routes';
import { errorHandler } from './middleware/error-handler';


const app = new Hono()

app.use('*', authMiddleware);

const { upgradeWebSocket, websocket } =
  createBunWebSocket<ServerWebSocket>()


app.get(
  '/ws',
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`)
        ws.send('Hello from server!')
      },
      onClose: () => {
        console.log('Connection closed')
      },
    }
  })
)

app.get(
  '/',
  (c) => {
    return c.text(`Hello`)
  }
)

app.route('/users',users)

app.route('/auth', authRoutes)

app.route('/board', boardRoutes)

app.onError(errorHandler)



export default {
  fetch: app.fetch,
  websocket,
}
