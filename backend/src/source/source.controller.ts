import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { SourceService } from './source.service';
import { SwaggerAuthDecorator } from 'src/common/decorators/openapi-auth.decorator';

export class SearchDto {
  @ApiProperty()
  search: string;
}

@Controller('source')
@ApiTags('Source')
@SwaggerAuthDecorator
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search for sources' })
  async search(@Query() searchDto: SearchDto) {
    return this.sourceService.search(searchDto);
  }
}
