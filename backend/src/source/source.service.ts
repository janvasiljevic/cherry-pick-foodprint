import { Injectable } from '@nestjs/common';
import { SearchDto } from './source.controller';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Source } from 'src/entities/Source.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { Ingridient } from 'src/entities/Ingridient.entity';

@Injectable()
export class SourceService {
  private readonly sourceRepository: EntityRepository<Source>;

  constructor(
    @InjectRepository(Source) sourceRepository: EntityRepository<Source>,
    private readonly em: EntityManager,
  ) {
    this.sourceRepository = sourceRepository;
  }

  async search(searchDto: SearchDto): Promise<Source[]> {
    const knex = this.em.getKnex();

    // use knex to query the database
    // get top 3 results
    // based on the similarity of the search term to the food_item column
    const sources = await knex.raw(
      'SELECT * FROM source WHERE similarity(food_item, ?) > 0.1 ORDER BY similarity(food_item, ?) DESC LIMIT 3',
      [searchDto.search, searchDto.search],
    );

    const results = sources.rows.map((s) => this.em.map(Source, s));

    return results;
  }

  async matchIngridient(ingridient: Ingridient) {
    const knex = this.em.getKnex();

    const sources = await knex.raw(
      'SELECT * FROM source WHERE similarity(food_item, ?) > 0.3 ORDER BY similarity(food_item, ?) DESC LIMIT 3',
      [ingridient.name, ingridient.name],
    );

    const results = sources.rows.map((s) => this.em.map(Source, s));

    if (results.length > 0) {
      const s = results[0];

      ingridient.source = s;

      const ogSource = await this.sourceRepository.findOne(
        { id: s.id },
        { populate: true, refresh: true },
      );

      ogSource.ingridients.add(ingridient);

      await this.sourceRepository.persistAndFlush(ogSource);

      if (ogSource.carbon_footprint != null) {
        ingridient.calculated_carbon_footprint =
          (s.carbon_footprint / 1000) * ingridient.weight;
      }

      if (ogSource.carbon_footprint != null) {
        ingridient.calculated_water_footprint =
          (ogSource.water_footprint / 1000) * ingridient.weight;
      }
    }
  }
}
