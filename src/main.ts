import * as passport from 'passport';
import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLoggerService } from 'common/logger/logger.service';
import { logger } from 'common/logger/logger.middleware';
import { DispatchError } from 'common/filters/DispatchError';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new CustomLoggerService(),
    });

    app.use(logger);
    app.use(session({
        secret: 'secret-key',
        name: 'nest-boilerplate',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.useGlobalFilters(new DispatchError());

    const options = new DocumentBuilder()
        .setTitle('Nest Boilperplate API')
        .setDescription('A basic nest.js boilerplate')
        .setVersion('0.0.1')
        .addTag('nestjs')
        .addBearerAuth('Authorization', 'header')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3333);
}
bootstrap();
