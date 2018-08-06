import {ErrorTypeEnum} from './ErrorTypeEnum';
import {IErrorMessage} from './IErrorMessage';
import {HttpStatus} from '@nestjs/common';

export class AppError extends Error {

    public errorCode: ErrorTypeEnum;
    public httpStatus: number;
    public errorMessage: string;
    public userMessage: string;

    constructor(errorCode: ErrorTypeEnum, customMessage?: string) {
        super();
        const errorMessageConfig: IErrorMessage = this.getError(errorCode);
        if (!errorMessageConfig) throw new Error('Unable to find message code error.');

        AppError.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.httpStatus = errorMessageConfig.httpStatus;
        this.errorCode = errorCode;
        this.errorMessage = customMessage || errorMessageConfig.errorMessage;
        this.userMessage = customMessage || errorMessageConfig.userMessage;
    }

    private getError(errorCode: ErrorTypeEnum): IErrorMessage {

        let res: IErrorMessage;

        switch (errorCode) {
            case ErrorTypeEnum.RESOURCE_NOT_FOUND:
                res = {
                    type: ErrorTypeEnum.RESOURCE_NOT_FOUND,
                    httpStatus: HttpStatus.NOT_FOUND,
                    errorMessage: 'Resource not found',
                    userMessage: 'Unable to find the resource with the provided information.',
                };
                break;
            case ErrorTypeEnum.RESOURCE_EXISTS:
                res = {
                    type: ErrorTypeEnum.RESOURCE_EXISTS,
                    httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
                    errorMessage: 'Resource exisists',
                    userMessage: 'Resource already exists',
                };
                break;
            case ErrorTypeEnum.NOT_IN_SESSION:
                res = {
                    type: ErrorTypeEnum.NOT_IN_SESSION,
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    errorMessage: 'No Session',
                    userMessage: 'Session Expired',
                };
                break;
            case ErrorTypeEnum.NO_RESOURCE_IN_DB:
                res = {
                    type: ErrorTypeEnum.NO_RESOURCE_IN_DB,
                    httpStatus: HttpStatus.NOT_FOUND,
                    errorMessage: 'No resources exits in the database',
                    userMessage: 'No resources. Create some.',
                };
                break;
            case ErrorTypeEnum.WRONG_PASSWORD:
                res = {
                    type: ErrorTypeEnum.WRONG_PASSWORD,
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    errorMessage: 'Wrong password',
                    userMessage: 'Password does not match',
                };
                break;
        }
        return res;
    }

}