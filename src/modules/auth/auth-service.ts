import { HTTPException } from "hono/http-exception";
import { sign } from 'hono/jwt'
import { UserRepository } from "../../infraestructure/repositories/user/user-repository";
import { LoginDtoType } from "./dto/login-dto"
import { comparePassword } from "../../utils/hash-password";
import { UserPayload } from "../../interfaces/user/user";
import { JWTPayload } from "hono/utils/jwt/types";
import { secret } from "../../constants/secret";

const login = async(loginDtoType: LoginDtoType) => {

    const { email, password } = loginDtoType;
    
    const user = await UserRepository.getUserByEmail(email);
    
    if(!user) throw new HTTPException(404, {message: "Usuario no encontrado"});

    const isValidPassword = await comparePassword(password, user.password);

    if(isValidPassword){
        return {id: user.id, email: user.email, name: user.name} as UserPayload;
    }else{
        throw new HTTPException(401, {message: "Credenciales inválidas"})
    }

}

const signToken = async(userPayload: UserPayload) => {
    
    const { email, id, name} = userPayload;
    const payload: JWTPayload = {
        name,
        email,
        id,
        exp: Math.floor(Date.now() / 1000) + 60 * 1,
    }
    const token = await sign(payload, secret);
    return token;
}

export const AuthService = {
    login,
    signToken
}