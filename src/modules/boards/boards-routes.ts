import { Hono } from "hono";
import { BoardService } from "./boards-service";
import { CreateBoardDto, CreateBoardDtoType } from "./dto/create-board-dto";
import { validateJsonBody } from "../../utils/validate-json-body";

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


boardRoutes.post('/', validateJsonBody(CreateBoardDto) ,async(c) => {
    const body: CreateBoardDtoType = c.req.valid("json");
    await boardService.create(body)
    return c.json({message: "Tablero creado exitosamente"})
})