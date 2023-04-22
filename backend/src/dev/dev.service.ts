import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Source, Uncertainty } from 'src/entities/Source.entity';
import { parse } from 'csv-parse';

type ReadCsvRow = {
  food_group: string;
  food_item: string;
  co2_footprint_kg: string;
  co2_footprint_uncertainty?: Uncertainty;
  'Water Footprint kg': string;
  water_footprint_uncertainty?: Uncertainty;
};

@Injectable()
export class DevService {
  private readonly sourceRepository: EntityRepository<Source>;

  constructor(
    @InjectRepository(Source) sourceRepository: EntityRepository<Source>,
  ) {
    this.sourceRepository = sourceRepository;
  }

  async seed() {
    const csvFilePath = path.resolve(__dirname, '../../../ml/data/merged.csv');

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
  }
}
