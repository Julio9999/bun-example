import { Hono } from "hono";
import { BoardService } from "./boards-service";

const boardService = BoardService.getInstance();

export const boardRoutes = new Hono();

boardRoutes.get('/', async(c) => {
    const boards = await boardService.findAll();
    return c.json(boards);
})

boardRoutes.get('/:id', async(c) => {
    const id = c.req.param('id')
    const board = await boardService.findById(+id)
    return c.json(board);
})