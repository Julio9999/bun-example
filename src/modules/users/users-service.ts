import { User } from "../../entities/user/user.entity";
import { UserRepository } from "../../infraestructure/repositories/user/user-repository";
import { hasPassword } from "../../utils/hash-password";
import { CreateUserDtoType } from "./dto/create-user-dto";
import { HTTPException } from "hono/http-exception";



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

    const userToCreate: User = {
      email,
      name,
      password: hashedPassword,
      disabled: false,
      id: 0
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
