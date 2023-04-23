import { Injectable } from '@nestjs/common';
import { SearchDto } from './source.controller';
import { EntityRepository, wrap } from '@mikro-orm/core';
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

    const results: Source[] = sources.rows.map((s) => this.em.map(Source, s));

    if (results.length > 0) {
      const s = results[0];

      s.ingridients.init();
      s.ingridients.add(ingridient);

      await this.sourceRepository.persistAndFlush(s);

      let co2 = 0,
        water = 0;

      if (s.carbon_footprint != null) {
        co2 = (s.carbon_footprint / 1000) * ingridient.weight;
      }

      if (s.carbon_footprint != null) {
        water = (s.water_footprint / 1000) * ingridient.weight;
      }

      ingridient.calculated_carbon_footprint = co2;
      ingridient.calculated_water_footprint = water;
      ingridient.source = s;
    }
  }
}
