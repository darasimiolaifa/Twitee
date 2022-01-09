import { Injectable } from '@nestjs/common';
import { Users } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDTO } from './create-user.dto';
import * as uuid from 'uuid';

@EntityRepository(Users)
@Injectable()
export class UserRepository extends Repository<Users> {
    async createUser(registerDTO: CreateUserDTO): Promise<Users> {

        try {
            const newUser = new Users();
    
            newUser.id = uuid.v4();
            newUser.email = registerDTO.email;
            newUser.password = registerDTO.password;
            newUser.created_at = new Date();
            newUser.name = registerDTO.name;
    
            return await this.save(newUser);
        } catch (error) {
            throw error;
        }
    }
}