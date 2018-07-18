import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';

import { ThingModule } from './api/thing/thing.module';

@Module({
  imports: [ThingModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
