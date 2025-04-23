import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserChangePasswordPayloadDto {
  @ApiProperty({ example: 'pass123' })
  @IsNotEmpty()
  @IsString()
  old_password: string;

  @ApiProperty({ example: 'pass1234' })
  @IsNotEmpty()
  @IsString()
  new_password: string;

  @ApiProperty({ example: 'pass1234' })
  @IsNotEmpty()
  @IsString()
  new_password_confirm: string;
}
