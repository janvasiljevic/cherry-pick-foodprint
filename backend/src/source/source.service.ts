import { Injectable } from '@nestjs/common';
import { SearchDto } from './source.controller';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Source } from 'src/entities/Source.entity';

@Injectable()
export class SourceService {
  private readonly sourceRepository: EntityRepository<Source>;

  constructor(
    @InjectRepository(Source) sourceRepository: EntityRepository<Source>,
  ) {
    this.sourceRepository = sourceRepository;
  }

  async search(searchDto: SearchDto) {
    console.log(searchDto);
  }
}
