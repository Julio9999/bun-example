import { HTTPException } from "hono/http-exception";
import { Board } from "../../entities/board/board.entity";
import { BoardsRepository } from "../../infraestructure/repositories/boards/boards-repository";
import { CreateBoardDtoType } from "./dto/create-board-dto";

export class BoardService {

    private readonly boardsRepository: BoardsRepository;

    constructor(){
        this.boardsRepository = new BoardsRepository();
    }

    static getInstance(){
        return new BoardService;
    }

    findAll = async (): Promise<Board[]> => {
        const res: Board[] = await this.boardsRepository.findAll();
        return res;
    }

    findById = async(id: number) => {
        const res = await this.boardsRepository.findById(id);
        
        if(!res) throw new HTTPException(404, {message: "Tablero no encontrado"})
        return res;
    }

    create = async(board: CreateBoardDtoType) => {
        const res = await this.boardsRepository.create(board);

        return res;
    }
}