import { Hono } from 'hono';
import { createBunWebSocket } from 'hono/bun';
import { authMiddleware } from './middleware/auth';
import { users } from './modules/users/users-routes';
import { authRoutes } from './modules/auth/auth-routes';
import { boardRoutes } from './modules/boards/boards-routes';
import { errorHandler } from './middleware/error-handler';
import { validateJsonMiddleware } from './middleware/validate-json-middleware';
const app = new Hono();
app.use('*', authMiddleware);
app.use('*', validateJsonMiddleware);
const { upgradeWebSocket, websocket } = createBunWebSocket();
app.get('/ws', upgradeWebSocket((c) => {
    return {
        onMessage(event, ws) {
            console.log(`Message from client: ${event.data}`);
            ws.send('Hello from server!');
        },
        onClose: () => {
            console.log('Connection closed');
        },
    };
}));
app.route('/users', users);
app.route('/auth', authRoutes);
app.route('/board', boardRoutes);
app.onError(errorHandler);
export default {
    fetch: app.fetch,
    websocket,
};
