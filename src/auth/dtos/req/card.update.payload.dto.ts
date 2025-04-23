import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardUpdatePayloadDto {
  @ApiProperty({ example: 'My Card 1' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
