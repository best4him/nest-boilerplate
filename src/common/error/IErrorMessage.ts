import {ErrorTypeEnum} from './ErrorTypeEnum';
import {HttpStatus} from '@nestjs/common';

export interface IErrorMessage {
    type: ErrorTypeEnum;
    httpStatus: HttpStatus;
    errorMessage: string;
    userMessage: string;
}