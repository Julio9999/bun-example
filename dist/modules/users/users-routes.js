import { Hono } from "hono";
import { UsersService } from "./users-service";
import { CreateUserDto } from "./dto/create-user-dto";
import { validateJsonBody } from "../../utils/validate-json-body";
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
    const body = c.req.valid('json');
    await usersService.create(body);
    return c.json({ message: "Usuario creado exitosamente" });
});
