import { Board } from "../../../entities/board/board.entity";
import { dbClient } from "../../database/db-client";
import { BaseRepository } from "../interfaces/base-repository";

export class BoardsRepository implements BaseRepository {

    create(data: Board) {
        return dbClient.board.create({
            data
        })
    }

    findById(id: number): Promise<Board | null> {
        return dbClient.board.findUnique({where: {id}})
    }

    findAll(): Promise<Board[]> {
        return dbClient.board.findMany()
    }
}