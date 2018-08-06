import { UserEntity } from './user.entity';
import { CreateUserDto } from './models/CreateUserDto';

export interface IUserService {
    findAll(): Promise<UserEntity[]>;
    createUser(user: CreateUserDto): Promise<UserEntity>;
}