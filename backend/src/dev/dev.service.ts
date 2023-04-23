import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Source, Uncertainty } from 'src/entities/Source.entity';
import { parse } from 'csv-parse';
import { EntityManager } from '@mikro-orm/postgresql';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { Recipe } from 'src/entities/Recipe.entity';
import { Ingridient } from 'src/entities/Ingridient.entity';
import { SourceService } from 'src/source/source.service';

type ReadCsvRow = {
  food_group: string;
  food_item: string;
  co2_footprint_kg: string;
  co2_footprint_uncertainty?: Uncertainty;
  'Water Footprint kg': string;
  water_footprint_uncertainty?: Uncertainty;
};

type ReadCsvRow3 = {
  url: string;
  quantity_unit: string;
  item: string;
};

type ReadCsvRow2 = {
  id: string;
  meal_type: string;
  name: string;
  url: string;
  image_url: string;
  alt: string;
  description: string;
};

@Injectable()
export class DevService {
  logger = new Logger(DevService.name);
  private readonly sourceRepository: EntityRepository<Source>;
  private readonly recipeRepository: EntityRepository<Recipe>;
  private readonly ingridientRepository: EntityRepository<Ingridient>;

  constructor(
    @InjectRepository(Source) sourceRepository: EntityRepository<Source>,
    @InjectRepository(Recipe) recipeRepository: EntityRepository<Recipe>,
    @InjectRepository(Ingridient)
    ingridientRepository: EntityRepository<Ingridient>,
    private readonly em: EntityManager,
    private readonly sourceService: SourceService,
  ) {
    this.sourceRepository = sourceRepository;
    this.recipeRepository = recipeRepository;
    this.ingridientRepository = ingridientRepository;
  }

  async seed() {
    const csvFilePath = path.resolve(__dirname, '../../../ml/data/merged.csv');

    // enable postggresql trigrams extension
    await this.em.execute('CREATE EXTENSION IF NOT EXISTS pg_trgm;');

    const headers = [
      'food_group',
      'food_item',
      'co2_footprint_kg',
      'co2_footprint_uncertainty',
      'Water Footprint kg',
      'water_footprint_uncertainty',
    ];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    // delete all rows in source table
    await this.sourceRepository.nativeDelete({});

    parse(
      fileContent,
      {
        delimiter: ',',
        columns: headers,
      },
      (error, result: ReadCsvRow[]) => {
        if (error) console.error(error);

        result.forEach(async (row, i) => {
          if (i == 0) return;

          const s = new Source();

          s.food_group = row.food_group;
          s.food_item = row.food_item;
          s.carbon_footprint =
            row.co2_footprint_kg !== ''
              ? parseFloat(row.co2_footprint_kg)
              : null;
          s.carbon_footprint_uncertainty = row.co2_footprint_uncertainty
            ? row.co2_footprint_uncertainty
            : null;
          s.water_footprint_uncertainty = row.water_footprint_uncertainty
            ? row.water_footprint_uncertainty
            : null;
          s.water_footprint =
            row['Water Footprint kg'] !== ''
              ? parseFloat(row['Water Footprint kg'])
              : null;

          this.sourceRepository.persist(s);
          this.sourceRepository.flush();
        });
      },
    );

    this.logger.log('Seeding sources done');
  }

  async seed1() {
    const headers2 = [
      'id',
      'meal_type',
      'name',
      'url',
      'image_url',
      'alt',
      'description',
    ];

    const csvFilePath2 = path.resolve(
      __dirname,
      '../../../ml/scraped/recipes_list.csv',
    );

    // ddelete all rows in recipe table
    await this.ingridientRepository.nativeDelete({});
    await this.recipeRepository.nativeDelete({});

    const fileContent2 = fs.readFileSync(csvFilePath2, { encoding: 'utf-8' });

    await parse(
      fileContent2,
      {
        delimiter: ',',
        columns: headers2,
      },
      async (error, result: ReadCsvRow2[]) => {
        if (error) console.error(error);

        await Promise.all(
          result.map(async (row, i) => {
            if (i == 0) return;

            console.log(row.image_url);

            this.em.create(
              Recipe,
              {
                name: row.name,
                link: row.url,
                description: row.description,
                image_url: row.image_url,
                serverSideProvided: true,
              },
              { persist: true },
            );

            await this.em.flush();
          }),
        );
      },
    );

    this.logger.log('Seeding recipes done');
  }

  async seed2() {
    const headers3 = ['url', 'quantity_unit', 'item'];
    const csvFilePath3 = path.resolve(
      __dirname,
      '../../../ml/scraped/recipes_list_processed.csv',
    );
    const fileContent3 = fs.readFileSync(csvFilePath3, { encoding: 'utf-8' });

    parse(
      fileContent3,
      {
        delimiter: ',',
        columns: headers3,
      },
      async (error, result: ReadCsvRow3[]) => {
        if (error) console.error(error);

        for (const row of result) {
          const recipe = await this.recipeRepository.findOne(
            { link: row.url },
            { refresh: true, populate: ['ingridients'] },
          );

          if (!recipe) continue;

          let number = 0;

          if (row.quantity_unit != null) {
            const arr = row.quantity_unit.match(/\d+/g);

            if (arr != null && arr.length > 0) {
              number = parseFloat(arr[0]);
            }

            if (row.quantity_unit.includes('kg')) {
              number *= 1000;
            }
          }

          const ingridient = this.em.create(
            Ingridient,
            {
              name: row.item,
              weight: number,
              recipe: recipe,
            },
            { persist: true },
          );

          await this.sourceService.matchIngridient(ingridient);

          await this.em.flush();

          await this.ingridientRepository.persistAndFlush(ingridient);
          await this.recipeRepository.persistAndFlush(recipe);
        }

        await this.recipeRepository.flush();
        await this.ingridientRepository.flush();
      },
    );

    this.logger.log('Seeding ingridients done');
  }

  async seed3() {
    // final all recipes
    const recipes = await this.recipeRepository.findAll({});

    // for each recipe find all ingridients and calculate carbon footprint and water footprint
    for (let i = 0; i < recipes.length; i++) {
      const recipe = await this.recipeRepository.findOne(
        { id: recipes[i].id },
        { populate: ['ingridients'], refresh: true },
      );

      // console.log(recipe.ingridients.getItems());

      recipe.calculate_carbon_footprint = 0;
      recipe.calculate_water_footprint = 0;

      recipe.ingridients.getItems().forEach((ing) => {
        if (ing.calculated_carbon_footprint != null) {
          recipe.calculate_carbon_footprint +=
            ing.calculated_carbon_footprint * ing.weight;
        }

        if (ing.calculated_water_footprint != null) {
          recipe.calculate_water_footprint +=
            ing.calculated_water_footprint * ing.weight;
        }
      });

      await this.recipeRepository.persist(recipe);
    }

    await this.recipeRepository.flush();

    this.logger.log('Seeding done');
  }
}
