import { User } from "../../../entities/user/user.entity";
import { AsignUsersToBoardType } from "../../../modules/users/dto/asign-user-to-board-dto";
import { CreateUserDtoType } from "../../../modules/users/dto/create-user-dto";
import { dbClient } from "../../database/db-client";
import { BaseRepository } from "../interfaces/base-repository";

export class UserRepository implements BaseRepository {
  create(data: CreateUserDtoType) {
    return dbClient`
      INSERT INTO "User" (email, name, password)
      VALUES (${(data.email, data.name, data.password)})
      RETURNING *
    `;
  }

  async findById(id: number): Promise<User> {
    const [user] = await dbClient`
      SELECT id, email, name, "boardId"  FROM "User" WHERE id=${id}
    `;
    return user;
  }

  findAll(): Promise<User[]> {
    return dbClient`
      SELECT id, name, email FROM "User"
    `;
  }

  async getUserByEmail(email: string): Promise<User> {
    const [user] = await dbClient`
      SELECT id, name, email, password, "boardId" FROM "User"
      WHERE email=${email} AND disabled=${false};
    `;
    return user;
  }

  setUserToBoard(asignUserToBoard: AsignUsersToBoardType) {
    const { boardId, userIds } = asignUserToBoard;

    const query = `UPDATE "User"
    SET "boardId" = ${boardId}
    WHERE "id" IN (${userIds.join(', ')});
  `
    return dbClient(query);
  }
}
