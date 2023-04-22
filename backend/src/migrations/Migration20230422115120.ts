import { Migration } from '@mikro-orm/migrations';

export class Migration20230422115120 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "comment" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "commented_by_id" varchar(255) not null, "recipe_id" varchar(255) not null, "text" varchar(255) not null, "downvotes" int not null, "upvotes" int not null, constraint "comment_pkey" primary key ("id"));');

    this.addSql('create table "user_bookmarks" ("user_id" varchar(255) not null, "recipe_id" varchar(255) not null, constraint "user_bookmarks_pkey" primary key ("user_id", "recipe_id"));');

    this.addSql('create table "user_friends" ("user_1_id" varchar(255) not null, "user_2_id" varchar(255) not null, constraint "user_friends_pkey" primary key ("user_1_id", "user_2_id"));');

    this.addSql('alter table "comment" add constraint "comment_commented_by_id_foreign" foreign key ("commented_by_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade;');

    this.addSql('alter table "user_bookmarks" add constraint "user_bookmarks_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_bookmarks" add constraint "user_bookmarks_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_friends" add constraint "user_friends_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_friends" add constraint "user_friends_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user" add column "socials" text[] null;');

    this.addSql('alter table "recipe" add column "author_id" varchar(255) not null, add column "calculate_carbon_footprint" int null, add column "calculate_water_footprint" int null;');
    this.addSql('alter table "recipe" add constraint "recipe_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "ingridient" add column "recipe_id" varchar(255) not null;');
    this.addSql('alter table "ingridient" add constraint "ingridient_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "comment" cascade;');

    this.addSql('drop table if exists "user_bookmarks" cascade;');

    this.addSql('drop table if exists "user_friends" cascade;');

    this.addSql('alter table "ingridient" drop constraint "ingridient_recipe_id_foreign";');

    this.addSql('alter table "recipe" drop constraint "recipe_author_id_foreign";');

    this.addSql('alter table "ingridient" drop column "recipe_id";');

    this.addSql('alter table "recipe" drop column "author_id";');
    this.addSql('alter table "recipe" drop column "calculate_carbon_footprint";');
    this.addSql('alter table "recipe" drop column "calculate_water_footprint";');

    this.addSql('alter table "user" drop column "socials";');
  }

}
