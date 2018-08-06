import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Thing } from './thing.entity';
import { Repository } from 'typeorm';
import { timingSafeEqual } from 'crypto';
import { CreateThingDto } from './models/CreateThingDto';

@Injectable()
export class ThingService {
    constructor(
        @InjectRepository(Thing)
        private readonly thingRepository: Repository<Thing>,
    ) { }

    async create(thing: CreateThingDto) {
        await this.thingRepository.insert(thing);
    }

    async findAll(): Promise<Thing[]> {
        return await this.thingRepository.find();
    }
}