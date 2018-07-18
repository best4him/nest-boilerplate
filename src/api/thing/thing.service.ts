import { Injectable } from '@nestjs/common';
import { ThingDto } from './thing.dto';

@Injectable()
export class ThingService {
    private readonly things: ThingDto[] = [
        {name: 'nest', age: 23},
    ];

    create(thing: ThingDto) {
        this.things.push(thing);
    }

    findAll(): ThingDto[] {
        return this.things;
    }
}