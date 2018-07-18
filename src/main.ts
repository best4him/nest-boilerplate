import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import {CustomLoggerService} from './common/logger.service';
import { logger } from './common/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      logger: new CustomLoggerService(),
  });
  app.use(logger);
  await app.listen(3333);
}
bootstrap();
