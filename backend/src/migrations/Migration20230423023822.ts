import { Migration } from '@mikro-orm/migrations';

export class Migration20230423023822 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipe" drop constraint "recipe_author_id_foreign";');

    this.addSql('alter table "recipe" alter column "image_url" type varchar(255) using ("image_url"::varchar(255));');
    this.addSql('alter table "recipe" alter column "image_url" drop not null;');
    this.addSql('alter table "recipe" alter column "author_id" type varchar(255) using ("author_id"::varchar(255));');
    this.addSql('alter table "recipe" alter column "author_id" drop not null;');
    this.addSql('alter table "recipe" add constraint "recipe_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipe" drop constraint "recipe_author_id_foreign";');

    this.addSql('alter table "recipe" alter column "image_url" type varchar(255) using ("image_url"::varchar(255));');
    this.addSql('alter table "recipe" alter column "image_url" set not null;');
    this.addSql('alter table "recipe" alter column "author_id" type varchar(255) using ("author_id"::varchar(255));');
    this.addSql('alter table "recipe" alter column "author_id" set not null;');
    this.addSql('alter table "recipe" add constraint "recipe_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
  }

}
