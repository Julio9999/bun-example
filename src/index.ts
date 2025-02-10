import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'
import type { ServerWebSocket } from 'bun'
import { authMiddleware } from './middleware/auth';
import { users } from './modules/users/users-routes';
import { authRoutes } from './modules/auth/auth-routes';
import { boardRoutes } from './modules/boards/boards-routes';
import { errorHandler } from './middleware/error-handler';
import { validateJsonMiddleware } from './middleware/validate-json-middleware';
import { statusRoutes } from './modules/status/status-routes';
import { cors } from 'hono/cors'


const app = new Hono()

app.use('*', cors({
  origin: 'http://localhost:3001',
  credentials: true
}))

app.use('*', authMiddleware);

app.use('*', validateJsonMiddleware);

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

app.route('/users',users)

app.route('/auth', authRoutes)

app.route('/board', boardRoutes)

app.route('/status', statusRoutes)

app.onError(errorHandler)



export default {
  fetch: app.fetch,
  websocket,
}
