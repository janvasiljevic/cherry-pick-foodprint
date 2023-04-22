import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIngridientDto {
  weight: number;

  name: string;

  @ApiPropertyOptional()
  sourceId?: string;
}
