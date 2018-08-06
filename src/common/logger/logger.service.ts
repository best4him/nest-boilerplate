import * as winston from 'winston';

import {LoggerService, Injectable} from '@nestjs/common';
import { format } from 'winston';

const {timestamp, label, json, colorize, combine} = format;

@Injectable()
export class CustomLoggerService implements LoggerService {
    private readonly logger;

    constructor() {
        this.logger =  winston.createLogger({
            level: 'info',
            format: combine(
                timestamp(),
                json(),
            ),
            transports: [
                new winston.transports.File({
                    filename: './logs/logs.log',
                }),
            ],
        });

        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
              format: winston.format.simple(),
            }));
          }
    }

    error(message: string, trace?: string) {
        this.logger.log('error', {
            message,
            trace,
        });
    }

    log(level: any, message?: string) {
        const winstonLevels = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];
        if (typeof level === 'string') {
            if (winstonLevels.indexOf(level) !== -1) {
                this.logger.log(level, message);
            } else {
                this.logger.log('info', level);
            }
        } else {
            this.logger.log(level);
        }
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    info(message: string) {
        this.logger.info(message);
    }
}
