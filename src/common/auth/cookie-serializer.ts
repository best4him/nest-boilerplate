import { PassportSerializer } from '@nestjs/passport/dist/passport.serializer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class CookieSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err, result) => void): any {
        done(null, user);
    }
    deserializeUser(payload: any, done: (err, result) => void): any {
        done(null, payload);
    }
}