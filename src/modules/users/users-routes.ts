import { Hono } from "hono";
import { UsersService } from "./users-service";
import { CreateUserDto, CreateUserDtoType } from "./dto/create-user-dto";
import { validateJsonBody } from "../../utils/validate-json-body";
import { AsignUsersToBoard, AsignUsersToBoardType } from "./dto/asign-user-to-board-dto";

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

users.post("/", validateJsonBody(CreateUserDto), async (c) => {
  const body: CreateUserDtoType = c.req.valid('json');
  await usersService.create(body);
  return c.json({ message: "Usuario creado exitosamente" });
});

users.put("/asignUserToBoard", validateJsonBody(AsignUsersToBoard), async(c) => {
  const body: AsignUsersToBoardType = c.req.valid('json');
  await usersService.asignUserToBoard(body);
  return c.json({message: "Usuarios asignados correctamente"});
})
