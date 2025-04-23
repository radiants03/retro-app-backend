import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryUpdatePayloadDto {
  @ApiProperty({ example: 'My Category 1' })
  @IsNotEmpty()
  @IsString()
  category_name: string;
}
