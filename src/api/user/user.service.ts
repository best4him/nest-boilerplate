import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { timingSafeEqual } from 'crypto';
import { IUserService } from './IUserService';
import { CreateUserDto } from './models/CreateUserDto';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    public async createUser(user: CreateUserDto): Promise<UserEntity> {
        return await UserEntity.createUser(user);
    }

    public async findAll(): Promise<UserEntity[]> {
        return await UserEntity.findAll();
    }

    // async findOneByToken(token: string): Promise<UserEntity> {
    //     // return await UserEntity.findAll();
    // }
}