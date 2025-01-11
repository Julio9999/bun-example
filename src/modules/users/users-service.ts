import { CreateUserDtoType } from "./dto/create-user-dto"
import { UserRepository } from '../../infraestructure/repositories/user/user-repository';
import { HTTPException } from "hono/http-exception";
import { hasPassword } from '../../utils/hash-password';

const createUser = async(createUserDtoType: CreateUserDtoType) => {
    const { password, email, name } = createUserDtoType;
    
    const hashedPassword = await hasPassword(password)

    const userToCreate:CreateUserDtoType = {
        email,
        name,
        password: hashedPassword
    }

    const res = await UserRepository.createUser(userToCreate);
    return res;
}

const getAllUsers = async() => {
    const res = await UserRepository.getAllUsers();
    return res;
}

const getUserById = async(id: number) => {
    const res = await UserRepository.getUserById(id);
    if(!res) throw new HTTPException(404, {message: "Usuario no encontrado"})
    return res;
}

export const UsersService = {
    createUser,
    getAllUsers,
    getUserById
}