import { Injectable } from '@nestjs/common';
import { UserEntity } from 'api/user/user.entity';

@Injectable()
export class AuthService {
    async validateUser(user: { username: string, password: string }): Promise<any> {
        return await UserEntity.authenticateUser(user);
    }
}