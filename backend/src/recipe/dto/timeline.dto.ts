import { ApiPropertyOptional } from '@nestjs/swagger';

export class TimelineGet {
  @ApiPropertyOptional()
  cursor?: string;
}
