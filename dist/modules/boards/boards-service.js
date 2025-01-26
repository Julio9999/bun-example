import { HTTPException } from "hono/http-exception";
import { BoardsRepository } from "../../infraestructure/repositories/boards/boards-repository";
export class BoardService {
    boardsRepository;
    constructor() {
        this.boardsRepository = new BoardsRepository();
    }
    static getInstance() {
        return new BoardService;
    }
    findAll = async () => {
        const res = await this.boardsRepository.findAll();
        return res;
    };
    findById = async (id) => {
        const res = await this.boardsRepository.findById(id);
        if (!res)
            throw new HTTPException(404, { message: "Tablero no encontrado" });
        return res;
    };
    create = async (board) => {
        const res = await this.boardsRepository.create(board);
        return res;
    };
}
