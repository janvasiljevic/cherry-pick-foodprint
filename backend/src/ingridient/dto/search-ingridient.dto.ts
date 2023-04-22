import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class SearchIngridientDto {
  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  search: string;
}
