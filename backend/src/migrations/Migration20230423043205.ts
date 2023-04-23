import { Migration } from '@mikro-orm/migrations';

export class Migration20230423043205 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "ingridient" alter column "calculated_carbon_footprint" type real using ("calculated_carbon_footprint"::real);');
    this.addSql('alter table "ingridient" alter column "calculated_water_footprint" type real using ("calculated_water_footprint"::real);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ingridient" alter column "calculated_carbon_footprint" type int using ("calculated_carbon_footprint"::int);');
    this.addSql('alter table "ingridient" alter column "calculated_water_footprint" type int using ("calculated_water_footprint"::int);');
  }

}
