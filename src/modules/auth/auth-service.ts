import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

import { LoginDtoType } from "./dto/login-dto";
import { UserRepository } from "../../infraestructure/repositories/user/user-repository";
import { comparePassword } from "../../utils/hash-password";
import { UserPayload } from "../../interfaces/auth/user";
import { secret } from "../../constants/secret";


export class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  static getInstance() {
    return new AuthService();
  }

  login = async (loginDtoType: LoginDtoType) => {
    const { email, password } = loginDtoType;

    const user = await this.userRepository.getUserByEmail(email);

    if (!user)
      throw new HTTPException(404, { message: "Usuario no encontrado" });

    const isValidPassword = await comparePassword(password, user.password);

    if (isValidPassword) {
      return { id: user.id, email: user.email, name: user.name } as UserPayload;
    } else {
      throw new HTTPException(401, { message: "Credenciales inválidas" });
    }
  };

  signToken = async (userPayload: UserPayload) => {
    const { email, id, name } = userPayload;
    const payload: JWTPayload = {
      name,
      email,
      id,
      exp: Math.floor(Date.now() / 1000) + 60 * 5,
    };
    const token = await sign(payload, secret);
    return token;
  };
}
