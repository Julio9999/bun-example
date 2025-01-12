import { Hono } from 'hono'
import { errorHandler } from './middleware/error-handler'
import { authMiddleware } from './middleware/auth'
import { users } from './modules/users/users-routes'
import { authRoutes } from './modules/auth/auth-routes'

const app = new Hono()

app.use('*', authMiddleware);

app.get(
  '/',
  (c) => {
    return c.text(`Hello`)
  }
)

app.route('/users',users)

app.route('/auth', authRoutes)

app.onError(errorHandler)



export default app
