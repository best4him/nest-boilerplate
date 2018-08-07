import * as passport from 'passport';
import * as session from 'express-session';
import * as lusca from 'lusca';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLoggerService } from 'common/logger/logger.service';
import { logger } from 'common/logger/logger.middleware';
import { DispatchError } from 'common/filters/DispatchError';
import { ConfigService } from '../config.service';

async function bootstrap() {

    const app = await NestFactory.create(AppModule, {
        logger: new CustomLoggerService(),
    });
    const env: ConfigService = app.get('ConfigService');

    app.use(logger);
    app.use(session({
        secret: env.sessionSecret,
        name: 'nest-boilerplate',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    if (env.nodeEnv !== 'test' && env.nodeEnv !== 'development') {
        app.use(lusca({
            csrf: {
                header: 'x-xsrf-token',
            },
            xframe: 'SAMEORIGIN',
            hsts: {
                maxAge: 31536000, // 1 year, in seconds
                includeSubDomains: true,
                preload: true,
            },
            xssProtection: true,
        }));
    }

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

    await app.listen(env.port);
}
bootstrap();
