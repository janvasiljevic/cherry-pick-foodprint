import { Migration } from '@mikro-orm/migrations';

export class Migration20230423043931 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipe" alter column "calculate_carbon_footprint" type real using ("calculate_carbon_footprint"::real);');
    this.addSql('alter table "recipe" alter column "calculate_water_footprint" type real using ("calculate_water_footprint"::real);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipe" alter column "calculate_carbon_footprint" type int using ("calculate_carbon_footprint"::int);');
    this.addSql('alter table "recipe" alter column "calculate_water_footprint" type int using ("calculate_water_footprint"::int);');
  }

}
