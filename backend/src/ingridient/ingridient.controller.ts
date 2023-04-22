import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IngridientService } from './ingridient.service';
import { CreateIngridientDto } from './dto/create-ingridient.dto';
import { SearchIngridientDto } from './dto/search-ingridient.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('ingridient')
@ApiTags('Ingridients')
export class IngridientController {
  constructor(private readonly ingridientService: IngridientService) {}

  @Post()
  create(@Body() createIngridientDto: CreateIngridientDto) {
    return this.ingridientService.create(createIngridientDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search ingridients -TOOD' })
  search(@Query() searchIngridient: SearchIngridientDto) {
    console.log(searchIngridient);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingridientService.remove(+id);
  }
}
