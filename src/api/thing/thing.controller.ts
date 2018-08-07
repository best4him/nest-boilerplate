import { Controller, Body, Post, Get, Param, Put, Delete, Query, Logger, UseGuards } from '@nestjs/common';
import { ThingService } from './thing.service';
import { CustomLoggerService } from 'common/logger/logger.service';
import { Thing } from './thing.entity';
import { SessionGuard } from 'common/auth/SessionGuard';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateThingDto } from './models/CreateThingDto';
@Controller('things')
export class ThingController {
    constructor(private readonly thingService: ThingService, private readonly logger: CustomLoggerService) { }

    @Post()
    @ApiOperation({title: 'Create a thing'})
    @UseGuards(SessionGuard)
    @ApiBearerAuth()
    create(@Body() thing: CreateThingDto) {
        this.thingService.create(thing);
        this.logger.info('Created thing was called!');

        return { success: true };
    }

    @Get()
    @ApiOperation({title: 'Get all things'})
    findAll() {
        this.logger.info('Works');
        return this.thingService.findAll();
    }

    @Get(':id')
    @ApiOperation({title: 'Get the thing using id'})
    findOne(@Param('id') id) {
        return `This action returns a #${id} cat`;
    }

    @Put(':id')
    @ApiOperation({title: 'Update the thing'})
    @ApiBearerAuth()
    @UseGuards(SessionGuard)
    update(@Param('id') id, @Body() ThingDto) {
        return `Update ${id}`;
    }

    @Delete(':id')
    @ApiOperation({title: 'Delete a thing by id'})
    @ApiBearerAuth()
    @UseGuards(SessionGuard)
    remove(@Param('id') id) {
        return `This action removes a #${id} cat`;
    }
}