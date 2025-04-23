import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentUpdatePayloadDto {
  @ApiProperty({ example: 'My Comment 1' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
