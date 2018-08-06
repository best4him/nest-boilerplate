import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { ThingModule } from 'api/thing/thing.module';
import { UserModule } from 'api/user/user.module';
import { AuthModule } from 'common/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ThingModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [],
})
export class AppModule { }
