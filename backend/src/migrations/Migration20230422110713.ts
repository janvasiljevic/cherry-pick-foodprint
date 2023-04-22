import { Migration } from '@mikro-orm/migrations';

export class Migration20230422110713 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "ingridient" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "ingridient_pkey" primary key ("id"));');

    this.addSql('create table "recipe" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null, "food_tags" text[] not null default \'{}\', constraint "recipe_pkey" primary key ("id"));');

    this.addSql('create table "source" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "food_group" varchar(255) not null, "food_item" varchar(255) not null, "carbon_footprint" int not null, "carbon_footprint_uncertainty" text check ("carbon_footprint_uncertainty" in (\'low\', \'high\')) not null, "water_footprint" int not null, "water_footprint_uncertainty" text check ("water_footprint_uncertainty" in (\'low\', \'high\')) not null, constraint "source_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "hashed_password" varchar(255) not null, "first_name" varchar(255) null, "last_name" varchar(255) null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "ingridient" cascade;');

    this.addSql('drop table if exists "recipe" cascade;');

    this.addSql('drop table if exists "source" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
