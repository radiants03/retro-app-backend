import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterPayloadDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'pass123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'pass123' })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
