import { CreateUserDtoType } from "../../../modules/users/dto/create-user-dto";
import { prisma } from "../../database/prisma-client";
import { BaseRepository } from "../interfaces/base-repository";

export class UserRepository implements BaseRepository {

  
  create(createUserDto: CreateUserDtoType) {
    return prisma.user.create({
      data: createUserDto,
    });
  }

  findById(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
        disabled: false,
      },
    });
  }

  findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  getUserByEmail(email: string) {
    return prisma.user.findUnique({
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
