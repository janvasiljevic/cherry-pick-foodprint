import { Migration } from '@mikro-orm/migrations';

export class Migration20230423074656 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "ingridient" drop constraint "ingridient_recipe_id_foreign";');

    this.addSql('alter table "ingridient" alter column "recipe_id" type varchar(255) using ("recipe_id"::varchar(255));');
    this.addSql('alter table "ingridient" alter column "recipe_id" drop not null;');
    this.addSql('alter table "ingridient" alter column "weight" drop default;');
    this.addSql('alter table "ingridient" alter column "weight" type int using ("weight"::int);');
    this.addSql('alter table "ingridient" add constraint "ingridient_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ingridient" drop constraint "ingridient_recipe_id_foreign";');

    this.addSql('alter table "ingridient" alter column "recipe_id" type varchar(255) using ("recipe_id"::varchar(255));');
    this.addSql('alter table "ingridient" alter column "recipe_id" set not null;');
    this.addSql('alter table "ingridient" alter column "weight" type int using ("weight"::int);');
    this.addSql('alter table "ingridient" alter column "weight" set default 0;');
    this.addSql('alter table "ingridient" add constraint "ingridient_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade;');
  }

}
