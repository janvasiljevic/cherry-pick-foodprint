import { Migration } from '@mikro-orm/migrations';

export class Migration20230422203720 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "source" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "food_group" varchar(255) not null, "food_item" varchar(255) not null, "carbon_footprint" real null, "carbon_footprint_uncertainty" smallint null, "water_footprint" real null, "water_footprint_uncertainty" smallint null, constraint "source_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "hashed_password" varchar(255) not null, "first_name" varchar(255) null, "last_name" varchar(255) null, "socials" text[] null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "recipe" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) not null, "author_id" varchar(255) not null, "food_tags" text[] not null default \'{}\', "calculate_carbon_footprint" int null, "calculate_water_footprint" int null, constraint "recipe_pkey" primary key ("id"));');

    this.addSql('create table "ingridient" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "recipe_id" varchar(255) not null, "name" varchar(255) not null, "weight" int not null, "source_id" varchar(255) null, "calculated_carbon_footprint" int null, "calculated_water_footprint" int null, constraint "ingridient_pkey" primary key ("id"));');

    this.addSql('create table "comment" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "commented_by_id" varchar(255) not null, "recipe_id" varchar(255) not null, "text" varchar(255) not null, "downvotes" int not null, "upvotes" int not null, constraint "comment_pkey" primary key ("id"));');

    this.addSql('create table "user_bookmarks" ("user_id" varchar(255) not null, "recipe_id" varchar(255) not null, constraint "user_bookmarks_pkey" primary key ("user_id", "recipe_id"));');

    this.addSql('create table "user_followers" ("user_1_id" varchar(255) not null, "user_2_id" varchar(255) not null, constraint "user_followers_pkey" primary key ("user_1_id", "user_2_id"));');

    this.addSql('alter table "recipe" add constraint "recipe_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "ingridient" add constraint "ingridient_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade;');
    this.addSql('alter table "ingridient" add constraint "ingridient_source_id_foreign" foreign key ("source_id") references "source" ("id") on update cascade on delete set null;');

    this.addSql('alter table "comment" add constraint "comment_commented_by_id_foreign" foreign key ("commented_by_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade;');

    this.addSql('alter table "user_bookmarks" add constraint "user_bookmarks_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_bookmarks" add constraint "user_bookmarks_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_followers" add constraint "user_followers_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_followers" add constraint "user_followers_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ingridient" drop constraint "ingridient_source_id_foreign";');

    this.addSql('alter table "recipe" drop constraint "recipe_author_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_commented_by_id_foreign";');

    this.addSql('alter table "user_bookmarks" drop constraint "user_bookmarks_user_id_foreign";');

    this.addSql('alter table "user_followers" drop constraint "user_followers_user_1_id_foreign";');

    this.addSql('alter table "user_followers" drop constraint "user_followers_user_2_id_foreign";');

    this.addSql('alter table "ingridient" drop constraint "ingridient_recipe_id_foreign";');

    this.addSql('alter table "comment" drop constraint "comment_recipe_id_foreign";');

    this.addSql('alter table "user_bookmarks" drop constraint "user_bookmarks_recipe_id_foreign";');

    this.addSql('drop table if exists "source" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "recipe" cascade;');

    this.addSql('drop table if exists "ingridient" cascade;');

    this.addSql('drop table if exists "comment" cascade;');

    this.addSql('drop table if exists "user_bookmarks" cascade;');

    this.addSql('drop table if exists "user_followers" cascade;');
  }

}
