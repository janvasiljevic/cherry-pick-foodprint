import { Migration } from '@mikro-orm/migrations';

export class Migration20230422203914 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "source" drop constraint if exists "source_carbon_footprint_uncertainty_check";');
    this.addSql('alter table "source" drop constraint if exists "source_water_footprint_uncertainty_check";');

    this.addSql('alter table "source" alter column "carbon_footprint_uncertainty" type text using ("carbon_footprint_uncertainty"::text);');
    this.addSql('alter table "source" add constraint "source_carbon_footprint_uncertainty_check" check ("carbon_footprint_uncertainty" in (\'L\', \'H\'));');
    this.addSql('alter table "source" alter column "water_footprint_uncertainty" type text using ("water_footprint_uncertainty"::text);');
    this.addSql('alter table "source" add constraint "source_water_footprint_uncertainty_check" check ("water_footprint_uncertainty" in (\'L\', \'H\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "source" drop constraint if exists "source_carbon_footprint_uncertainty_check";');
    this.addSql('alter table "source" drop constraint if exists "source_water_footprint_uncertainty_check";');

    this.addSql('alter table "source" alter column "carbon_footprint_uncertainty" type smallint using ("carbon_footprint_uncertainty"::smallint);');
    this.addSql('alter table "source" alter column "water_footprint_uncertainty" type smallint using ("water_footprint_uncertainty"::smallint);');
  }

}
