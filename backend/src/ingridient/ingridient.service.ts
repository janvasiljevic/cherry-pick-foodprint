import { Injectable } from '@nestjs/common';
import { CreateIngridientDto } from './dto/create-ingridient.dto';
import { UpdateIngridientDto } from './dto/update-ingridient.dto';

@Injectable()
export class IngridientService {
  create(createIngridientDto: CreateIngridientDto) {
    return 'This action adds a new ingridient';
  }

  findAll() {
    return `This action returns all ingridient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingridient`;
  }

  update(id: number, updateIngridientDto: UpdateIngridientDto) {
    return `This action updates a #${id} ingridient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingridient`;
  }
}
