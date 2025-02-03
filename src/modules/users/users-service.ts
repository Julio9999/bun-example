import { UserRepository } from "../../infraestructure/repositories/user/user-repository";
import { hasPassword } from "../../utils/hash-password";
import { AsignUsersToBoardType } from "./dto/asign-user-to-board-dto";
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

    const userToCreate = {
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

  async asignUserToBoard(asignUsersToBoard: AsignUsersToBoardType){
    const res = await this.userRepository.setUserToBoard(asignUsersToBoard);
    console.log(res)
    return res;
  }
}
