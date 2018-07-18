import { Controller, Body, Post, Get, Param, Put, Delete, Query, Logger } from '@nestjs/common';
import { ThingDto } from './thing.dto';
import { ThingService } from './thing.service';
import { CustomLoggerService } from '../../common/logger.service';
@Controller('things')
export class ThingController {
    constructor(private readonly thingService: ThingService, private readonly logger: CustomLoggerService) {}

    @Post()
    create(@Body() thing: ThingDto) {
        this.thingService.create(thing);
        this.logger.info('Created thing was called!');

        return {success: true};
    }

    @Get()
    findAll() {
        this.logger.info('Works');
        return this.thingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id) {
        return `This action returns a #${id} cat`;
    }

    @Put(':id')
    update(@Param('id') id, @Body() ThingDto) {
        return `Update ${id}`;
    }

    @Delete(':id')
    remove(@Param('id') id) {
      return `This action removes a #${id} cat`;
    }
}