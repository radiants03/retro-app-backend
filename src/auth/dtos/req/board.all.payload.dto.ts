import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SortBy } from 'src/utils/constants';

export class BoardAllPayloadDto {
  @ApiProperty({ example: 'DESC' })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy: SortBy;
}
