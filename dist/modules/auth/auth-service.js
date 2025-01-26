import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { UserRepository } from "../../infraestructure/repositories/user/user-repository";
import { comparePassword } from "../../utils/hash-password";
import { secret } from "../../constants/secret";
export class AuthService {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    static getInstance() {
        return new AuthService();
    }
    login = async (loginDtoType) => {
        const { email, password } = loginDtoType;
        const user = await this.userRepository.getUserByEmail(email);
        if (!user)
            throw new HTTPException(404, { message: "Usuario no encontrado" });
        const isValidPassword = await comparePassword(password, user.password);
        if (isValidPassword) {
            return { id: user.id, email: user.email, name: user.name };
        }
        else {
            throw new HTTPException(401, { message: "Credenciales inválidas" });
        }
    };
    signToken = async (userPayload) => {
        const { email, id, name } = userPayload;
        const payload = {
            name,
            email,
            id,
            exp: Math.floor(Date.now() / 1000) + 60 * 5,
        };
        const token = await sign(payload, secret);
        return token;
    };
}
