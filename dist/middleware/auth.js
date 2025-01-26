import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';
import { secret } from '../constants/secret';
export const authMiddleware = async (c, next) => {
    const excludedPaths = ['/auth/login'];
    const currentPath = c.req.path;
    if (excludedPaths.includes(currentPath)) {
        await next();
        return;
    }
    const accessToken = getCookie(c, 'access_token');
    if (!accessToken) {
        return c.json({ message: 'Credenciales inválidas' }, 401);
    }
    try {
        const isValid = await verify(accessToken, secret);
        if (!isValid) {
            return c.json({ message: 'Credenciales inválidas' }, 401);
        }
    }
    catch (error) {
        return c.json({ message: 'Unauthorized: Token validation failed' }, 401);
    }
    await next();
};
