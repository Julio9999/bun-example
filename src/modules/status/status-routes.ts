import { Hono } from "hono";
import { StatusService } from "./status-service";

const statusService = StatusService.getInstance();

export const statusRoutes = new Hono();

statusRoutes.get('/', async(c) => {
    const status = await statusService.findAll();
    
})
