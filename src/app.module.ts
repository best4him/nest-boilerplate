import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { ThingModule } from 'api/thing/thing.module';
import { UserModule } from 'api/user/user.module';
import { AuthModule } from 'common/auth/auth.module';
import { ConfigModule } from '../config.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'andrei',
                database: 'grit',
                entities: ['src/**/**.entity{.ts,.js}'],
                synchronize: true,
              },
        ),
        UserModule,
        AuthModule,
        ConfigModule,
        ThingModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [],
})
export class AppModule { }
