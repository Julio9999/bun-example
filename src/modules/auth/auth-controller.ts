import { Hono } from "hono";
import { setCookie, deleteCookie } from 'hono/cookie';
import { validate } from "../../middleware/validation";
import { LoginDto, LoginDtoType } from "./dto/login-dto";
import { AuthService } from "./auth-service";

export const authRoutes = new Hono();

authRoutes.post('/login', validate(LoginDto) , async(c) => {
    const body: LoginDtoType = await c.req.json();
    const userPayload = await AuthService.login(body);
    const access_token = await AuthService.signToken(userPayload);
    setCookie(c, 'access_token', access_token, {secure: true, httpOnly: true});
    return c.json({message: "Sesión iniciada correctamente"});
})

authRoutes.get('/logout', async(c) => {
    deleteCookie(c, 'access_token');
    return c.json({message: "Sesión cerrada correctamente"})
})