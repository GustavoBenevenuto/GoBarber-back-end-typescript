
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';
import { sign, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface RequestDTO {
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}

export default class AuthenticateUserService {
    public async execute({email, password}: RequestDTO): Promise<Response>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: {email}
        });

        if(!user){
            throw new Error('Incorrect email or password combination.');
        }

        // password = senha não criptografada
        // user.password = senha criptografada
        // compare() compara uma senha criptografada com um uma não criptografada
        const passwordMacthed = await compare(password, user.password);

        if(!passwordMacthed){
            throw new Error('Incorrect email or password combination.');
        }

        // 1° Parametro Payload | 2° Parametro Chave Secreta | 3° Parametro Config do Token
        const token = sign({}, authConfig.jwt.scret,{
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
        }
    }
}
