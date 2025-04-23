import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BoardCreatePayloadDto {
  @ApiProperty({ example: 'My Board 1' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
