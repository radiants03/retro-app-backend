import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryCreatePayloadDto {
  @ApiProperty({ example: 'My Category 1' })
  @IsNotEmpty()
  @IsString()
  category_name: string;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  board_id: number;
}
