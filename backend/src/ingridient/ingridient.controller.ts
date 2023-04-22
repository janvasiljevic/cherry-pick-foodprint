import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateIngridientDto } from './dto/create-ingridient.dto';
import { UpdateIngridientDto } from './dto/update-ingridient.dto';
import { IngridientService } from './ingridient.service';

@Controller('ingridient')
@ApiTags('Ingridients')
export class IngridientController {
  constructor(private readonly ingridientService: IngridientService) {}

  @Post()
  create(@Body() createIngridientDto: CreateIngridientDto) {
    return this.ingridientService.create(createIngridientDto);
  }

  @Patch(':id')
  update(
    @Body() updateIngridientDto: UpdateIngridientDto,
    @Param('id') id: string,
  ) {
    return this.ingridientService.update(id, updateIngridientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingridientService.remove(id);
  }
}
