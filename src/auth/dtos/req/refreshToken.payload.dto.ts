import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenPayloadDto {
  @ApiProperty({ example: '121-2121-212-1213123' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
