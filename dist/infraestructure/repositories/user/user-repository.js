import { dbClient } from "../../database/db-client";
export class UserRepository {
    create(data) {
        return dbClient `
      INSERT INTO "User" (email, name, password)
      VALUES (${data.email, data.name, data.password})
      RETURNING *
    `;
    }
    async findById(id) {
        const [user] = await dbClient `
      SELECT id, email, name, "boardId"  FROM "User" WHERE id=${id}
    `;
        return user;
    }
    findAll() {
        return dbClient `
      SELECT id, name, email FROM "User"
    `;
    }
    async getUserByEmail(email) {
        const [user] = await dbClient `
      SELECT id, name, email, password, "boardId" FROM "User"
      WHERE email=${email} AND disabled=${false};
    `;
        return user;
    }
}
