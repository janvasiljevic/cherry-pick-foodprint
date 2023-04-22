import { Injectable } from '@nestjs/common';
import { CreateIngridientDto } from './dto/create-ingridient.dto';
import { UpdateIngridientDto } from './dto/update-ingridient.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Ingridient } from 'src/entities/Ingridient.entity';
import { Source } from 'src/entities/Source.entity';
@Injectable()
export class IngridientService {
  private readonly ingridientsRepository: EntityRepository<Ingridient>;
  private readonly sourceRepository: EntityRepository<Source>;

  constructor(
    @InjectRepository(Ingridient)
    ingridientsRepository: EntityRepository<Ingridient>,
    @InjectRepository(Ingridient)
    sourceRepository: EntityRepository<Source>,
  ) {
    this.ingridientsRepository = ingridientsRepository;
    this.sourceRepository = sourceRepository;
  }

  async create(createIngridientDto: CreateIngridientDto) {
    const ingridient = new Ingridient();

    ingridient.name = createIngridientDto.name;
    ingridient.weight = createIngridientDto.weight;

    if (createIngridientDto.sourceId) {
      const source = await this.sourceRepository.findOne({
        id: createIngridientDto.sourceId,
      });

      if (!source) throw new Error('Source ingridient not found');

      ingridient.source = source;
    }

    await this.ingridientsRepository.persist(ingridient).flush();

    return ingridient;
  }

  async update(id: string, updateIngridientDto: UpdateIngridientDto) {
    const ingridient = await this.ingridientsRepository.findOne({ id });

    if (!ingridient) throw new Error('Ingridient not found');

    wrap(ingridient).assign(updateIngridientDto);

    await this.ingridientsRepository.flush();

    return ingridient;
  }

  async remove(id: string) {
    const ingridient = await this.ingridientsRepository.findOne({ id });

    if (!ingridient) throw new Error('Ingridient not found');

    this.ingridientsRepository.remove(ingridient).flush();

    return ingridient;
  }
}
