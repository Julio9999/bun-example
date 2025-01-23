import { User } from "../../../entities/user/user.entity";
import { dbClient } from "../../database/db-client";
import { BaseRepository } from "../interfaces/base-repository";


export class UserRepository implements BaseRepository {

  
  create(data: User) {
    return dbClient.user.create({
      data,
    });
  }

  findById(id: number) {
    return dbClient.user.findUnique({
      where: {
        id,
        disabled: false,
      },
    });
  }

  findAll() {
    return dbClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  getUserByEmail(email: string) {
    return dbClient.user.findUnique({
      where: {
        email,
        disabled: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }
}
