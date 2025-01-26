import { User } from "../../../entities/user/user.entity";
import { dbClient } from "../../database/db-client";
import { BaseRepository } from "../interfaces/base-repository";


export class UserRepository implements BaseRepository {

  
  create(data: User) {
    return dbClient`
      INSERT INTO "User" (email, name, password)
      VALUES (${data.email, data.name, data.password})
      RETURNING *
    `;
  }

  async findById(id: number) {
    const [user] = await dbClient`
      SELECT * FROM "User" WHERE id=${id}
    `;
    return user;
  }

  findAll() {
    return dbClient`
      SELECT id, name, email FROM User 
    `
  }

  async getUserByEmail(email: string) {
    const [user] = await dbClient`
      SELECT id, name, email, password FROM "User"
      WHERE email=${email} AND disabled=${false};
    `
    return user as User;
  }
}
