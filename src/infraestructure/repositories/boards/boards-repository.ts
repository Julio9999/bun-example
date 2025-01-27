import { Board } from "../../../entities/board/board.entity";
import { dbClient } from "../../database/db-client";
import { BaseRepository } from "../interfaces/base-repository";

export class BoardsRepository implements BaseRepository {
  create(data: Board) {
    return dbClient`
      INSERT INTO "Board" (name)
      VALUES (${data.name})
      RETURNING *
    `;
  }

  findById(id: number): Promise<Board | null> {
    return dbClient`
     SELECT * FROM "Board" WHERE id=${id}`;
  }

  async findAll(): Promise<Board[]> {
    const boards: Board[] = await dbClient`SELECT * FROM "Board"`;
    return boards;
  }
}
