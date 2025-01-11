import { CreateUserDtoType } from "../../../modules/users/dto/create-user-dto";
import { prisma } from "../../database/prisma-client";

const getAllUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const getUserById = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
      disabled: false,
    },
  });
};

const getUserByEmail = (email: string) => {
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
};

const createUser = (createUserDto: CreateUserDtoType) => {
  return prisma.user.create({
    data: createUserDto,
  });
};

export const UserRepository = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
};
