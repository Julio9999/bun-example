import { Hono } from "hono";
import { UsersService } from "./users-service";
import { CreateUserDto, CreateUserDtoType } from "./dto/create-user-dto";
import { validate } from '../../middleware/validation';

const usersService = UsersService.getInstance();

export const users = new Hono();

users.get("/", async (c) => {
  const res = await usersService.findAll();
  return c.json(res);
});
users.get("/:id", async (c) => {
  const userId = c.req.param("id");
  const res = await usersService.findById(Number(userId));
  return c.json(res);
});

users.post("/", validate(CreateUserDto), async (c) => {
  const body: CreateUserDtoType = await c.req.json();
  await usersService.create(body);
  return c.json({ message: "Usuario creado exitosamente" });
});
