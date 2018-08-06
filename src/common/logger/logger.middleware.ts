import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';

export function logger(req, res, next) {
    const logger: CustomLoggerService = new CustomLoggerService();
    logger.log({
        level: 'info',
        message: 'client request',
        ip: req.ip,
        method: req.method,
        host: `${req.headers.host + req.url}`,
        headers: req.headers,
    });
    next();
}