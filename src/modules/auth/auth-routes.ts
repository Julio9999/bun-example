import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";


import { AuthService } from "./auth-service";
import { LoginDto, LoginDtoType } from "./dto/login-dto";
import { validate } from "../../middleware/validation";

const authService = AuthService.getInstance();

export const authRoutes = new Hono();

authRoutes.post("/login", validate(LoginDto), async (c) => {

  const body: LoginDtoType = await c.req.json();

  const userPayload = await authService.login(body);

  const access_token = await authService.signToken(userPayload);

  setCookie(c, "access_token", access_token, {
    secure: true,
    httpOnly: true,
  });

  return c.json({ message: "Sesión iniciada correctamente" });
});

authRoutes.get("/logout", (c) => {

  deleteCookie(c, "access_token");

  return c.json({ message: "Sesión cerrada correctamente" });
});
