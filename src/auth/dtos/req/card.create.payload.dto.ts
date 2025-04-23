import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardCreatePayloadDto {
  @ApiProperty({ example: 'My Card 1' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;
}
