import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO{
    user_id: string;
    avatarFilename: string;
}

export default class UpdateUserAvatarService{
    public async execute({user_id, avatarFilename} : RequestDTO):Promise<User>{
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

        if(!user) {
            throw new AppError('Only authenticated users can change avatar',401);
        }

        if(user.avatar) {
            // Deletar avatar anterior

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            // True se existe e false caso não exista
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        //Se o usuário tiver id ele faz update, se não, ele faz insert
        await userRepository.save(user);

        return user;
    }
}
