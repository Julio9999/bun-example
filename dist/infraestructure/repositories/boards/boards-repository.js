import { dbClient } from "../../database/db-client";
export class BoardsRepository {
    create(data) {
        return dbClient `
      INSERT INTO "Board" (name)
      VALUES (${data.name})
      RETURNING *
    `;
    }
    findById(id) {
        return dbClient `
     SELECT * FROM "Board" WHERE id=${id}`;
    }
    async findAll() {
        const boards = await dbClient `SELECT * FROM "Board"`;
        return boards;
    }
}
