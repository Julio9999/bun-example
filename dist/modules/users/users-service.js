import { UserRepository } from "../../infraestructure/repositories/user/user-repository";
import { hasPassword } from "../../utils/hash-password";
import { HTTPException } from "hono/http-exception";
export class UsersService {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    static getInstance() {
        return new UsersService;
    }
    async create(createUserDtoType) {
        const { password, email, name } = createUserDtoType;
        const hashedPassword = await hasPassword(password);
        const userToCreate = {
            email,
            name,
            password: hashedPassword,
            disabled: false,
            id: 0,
            boardId: 0
        };
        const res = await this.userRepository.create(userToCreate);
        return res;
    }
    async findAll() {
        const res = await this.userRepository.findAll();
        return res;
    }
    async findById(id) {
        const res = await this.userRepository.findById(id);
        if (!res)
            throw new HTTPException(404, { message: "Usuario no encontrado" });
        return res;
    }
}
