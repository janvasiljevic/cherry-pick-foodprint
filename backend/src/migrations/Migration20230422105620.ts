import { Migration } from '@mikro-orm/migrations';

export class Migration20230422105620 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "source" add column "food_group" varchar(255) not null, add column "food_item" varchar(255) not null, add column "carbon_footprint" int not null, add column "carbon_footprint_uncertainty" text check ("carbon_footprint_uncertainty" in (\'low\', \'high\')) not null, add column "water_footprint" int not null, add column "water_footprint_uncertainty" text check ("water_footprint_uncertainty" in (\'low\', \'high\')) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "source" drop column "food_group";');
    this.addSql('alter table "source" drop column "food_item";');
    this.addSql('alter table "source" drop column "carbon_footprint";');
    this.addSql('alter table "source" drop column "carbon_footprint_uncertainty";');
    this.addSql('alter table "source" drop column "water_footprint";');
    this.addSql('alter table "source" drop column "water_footprint_uncertainty";');
  }

}
