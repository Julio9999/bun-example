import { CreateUserDtoType } from "./dto/create-user-dto";
import { HTTPException } from "hono/http-exception";
import { hasPassword } from "../../utils/hash-password";
import { UserRepository } from "../../infraestructure/repositories/user/user-repository";

export class UsersService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  static getInstance(){
    return new UsersService;
  }

  async create(createUserDtoType: CreateUserDtoType) {
    const { password, email, name } = createUserDtoType;

    const hashedPassword = await hasPassword(password);

    const userToCreate: CreateUserDtoType = {
      email,
      name,
      password: hashedPassword,
    };

    const res = await this.userRepository.create(userToCreate);
    return res;
  }

  async findAll() {
    const res = await this.userRepository.findAll();
    return res;
  }

  async findById(id: number) {
    const res = await this.userRepository.findById(id);
    if (!res)
      throw new HTTPException(404, { message: "Usuario no encontrado" });
    return res;
  }
}
