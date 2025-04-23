import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentCreatePayloadDto {
  @ApiProperty({ example: 'My Comment 1' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 'John Logi' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  cardId: number;
}
