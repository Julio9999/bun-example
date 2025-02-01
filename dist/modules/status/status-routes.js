import { Hono } from "hono";
import { StatusService } from "./status-service";
import { createStatusDto } from "./dto/create-status-dto";
import { validateJsonBody } from "../../utils/validate-json-body";
const statusService = StatusService.getInstance();
export const statusRoutes = new Hono();
statusRoutes.get('/', async (c) => {
    const status = await statusService.findAll();
    return c.json(status);
});
statusRoutes.get('/:id', async (c) => {
    const id = c.req.param('id');
    const res = await statusService.findById(+id);
    return c.json(res);
});
statusRoutes.post('/', validateJsonBody(createStatusDto), async (c) => {
    const body = c.req.valid('json');
    return c.json({ "message": body.name });
});
