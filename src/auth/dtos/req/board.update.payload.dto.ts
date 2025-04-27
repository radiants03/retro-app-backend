import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BoardUpdatePayloadDto {
  @ApiProperty({ example: 'My Board 1' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  show_names: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  show_likes: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  show_comments: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  is_public: boolean;
}
