import { Hono } from "hono";
import { validate } from "../../middleware/validation";
import { CreateUserDto, type CreateUserDtoType } from "./dto/create-user-dto";
import { UsersService } from "./users-service";

export const users = new Hono();

users.get("/", async (c) => {
  const res = await UsersService.getAllUsers();
  return c.json(res);
});

users.get("/:id", async (c) => {
  const userId = c.req.param("id");
  const res = await UsersService.getUserById(Number(userId));
  return c.json(res);
});

users.post("/", validate(CreateUserDto), async (c) => {
  const body: CreateUserDtoType = await c.req.json();

  await UsersService.createUser(body);

  return c.json({ message: "Usuario creado exitosamente" });
});

