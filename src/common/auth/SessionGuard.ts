import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ErrorTypeEnum } from '../error/ErrorTypeEnum';
import { AppError } from '../error/AppError';

export class SessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        try {
            if (request.session.passport.user)
                return true;
        } catch (e) {
            throw new AppError(ErrorTypeEnum.NOT_IN_SESSION);
        }
    }
}