import { Hono } from 'hono'
import { users } from './modules/users/users-controller'
import { errorHandler } from './middleware/error-handler'
import { authRoutes } from './modules/auth/auth-controller'
import { authMiddleware } from './middleware/auth'

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
