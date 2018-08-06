import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';
import { CreateUserDto } from './models/CreateUserDto';
import { ErrorTypeEnum } from 'common/error/ErrorTypeEnum';
import { AppError } from 'common/error/AppError';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 30,
    })
    firstName: string;

    @Column({
        length: 50,
    })
    lastName: string;

    @Column({
        length: 50,
    })
    username: string;

    @Column({
        length: 250,
        select: false,
        name: 'password',
    })
    public password_hash: string;

    set password(password: string) {
        const passHash = crypto.createHmac('sha256', password).digest('hex');
        this.password_hash = passHash;
    }

    public static async findAll(): Promise<UserEntity[]> {
        const users: UserEntity[] = await UserEntity.find();
        if (users.length > 0) {
            return Promise.resolve(users);
        } else {
            throw new AppError(ErrorTypeEnum.NO_RESOURCE_IN_DB);
        }

    }

    public static async createUser(user: CreateUserDto): Promise<UserEntity> {
        let u: UserEntity;
        u = await UserEntity.findOne({ username: user.username });
        if (u) {
            throw new AppError(ErrorTypeEnum.RESOURCE_EXISTS);
        } else {
            u = new UserEntity();
            Object.assign(u, user);
            return await UserEntity.save(u);
        }
    }

    public static async authenticateUser(user: { username: string, password: string }): Promise<UserEntity> {
        let u: UserEntity;
        u = await UserEntity.findOne({
            select: ['id', 'username', 'password_hash'],
            where: { username: user.username },
        });
        const passHash = crypto.createHmac('sha256', user.password).digest('hex');
        if (u.password_hash === passHash) {
            delete u.password_hash;
            return u;
        }
    }
}