import { Migration } from '@mikro-orm/migrations';

export class Migration20230422104042 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "ingridient" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "ingridient_pkey" primary key ("id"));');

    this.addSql('create table "recipe" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null, constraint "recipe_pkey" primary key ("id"));');

    this.addSql('create table "source" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "source_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "ingridient" cascade;');

    this.addSql('drop table if exists "recipe" cascade;');

    this.addSql('drop table if exists "source" cascade;');
  }

}
