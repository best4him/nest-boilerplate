import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';

export function logger(req, res, next) {
    const logger: CustomLoggerService = new CustomLoggerService();
    logger.info(JSON.stringify(req));

    next();
  }