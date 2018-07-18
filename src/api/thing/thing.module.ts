
import { ThingController } from './thing.controller';
import { ThingService } from './thing.service';
import { Module } from '@nestjs/common';
import { CustomLoggerService } from 'common/logger.service';

@Module({
    controllers: [ThingController],
    providers: [ThingService, CustomLoggerService],
    exports: [ThingService],
})
export class ThingModule {}