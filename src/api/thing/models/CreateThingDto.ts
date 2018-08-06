import { ApiModelProperty } from '@nestjs/swagger';

export class CreateThingDto {
    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly age: number;
}