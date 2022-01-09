import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CreateUserDTO } from './create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    private readonly userRepository: UserRepository;

    constructor(private readonly connection: Connection) {
        this.userRepository = this.connection.getCustomRepository(UserRepository)
    }

    async createUser(registrationPayload: CreateUserDTO) {
        return this.userRepository.createUser(registrationPayload);
    }

    async findUserById(id: number) {
        return this.userRepository.findOne(id);
    }

    async findOne(options: Record<string, unknown>) {
        return this.userRepository.findOne(options);
    }

    async findOneForLogin(email: string) {
        return await this.userRepository.createQueryBuilder('user')
            .where({ email })
            .addSelect('user.password')
            .getOne();
    }

}
