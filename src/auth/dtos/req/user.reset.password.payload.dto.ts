import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserResetPasswordPayloadDto {
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'abc' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'pass1234' })
  @IsNotEmpty()
  @IsString()
  new_password: string;

  @ApiProperty({ example: 'pass1234' })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
