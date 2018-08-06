
import { ThingController } from './thing.controller';
import { ThingService } from './thing.service';
import { Module } from '@nestjs/common';
import { CustomLoggerService } from 'common/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thing } from './thing.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Thing])],
    controllers: [ThingController],
    providers: [ThingService, CustomLoggerService],
    exports: [ThingService],
})
export class ThingModule { }