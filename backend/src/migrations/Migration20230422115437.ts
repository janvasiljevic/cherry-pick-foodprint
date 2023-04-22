import { Migration } from '@mikro-orm/migrations';

export class Migration20230422115437 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_followers" ("user_1_id" varchar(255) not null, "user_2_id" varchar(255) not null, constraint "user_followers_pkey" primary key ("user_1_id", "user_2_id"));');

    this.addSql('alter table "user_followers" add constraint "user_followers_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_followers" add constraint "user_followers_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "user_friends" cascade;');

    this.addSql('alter table "ingridient" add column "name" varchar(255) not null, add column "weight" int not null, add column "source_id" varchar(255) null, add column "calculated_carbon_footprint" int null, add column "calculated_water_footprint" int null;');
    this.addSql('alter table "ingridient" add constraint "ingridient_source_id_foreign" foreign key ("source_id") references "source" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user_friends" ("user_1_id" varchar(255) not null, "user_2_id" varchar(255) not null, constraint "user_friends_pkey" primary key ("user_1_id", "user_2_id"));');

    this.addSql('alter table "user_friends" add constraint "user_friends_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_friends" add constraint "user_friends_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "user_followers" cascade;');

    this.addSql('alter table "ingridient" drop constraint "ingridient_source_id_foreign";');

    this.addSql('alter table "ingridient" drop column "name";');
    this.addSql('alter table "ingridient" drop column "weight";');
    this.addSql('alter table "ingridient" drop column "source_id";');
    this.addSql('alter table "ingridient" drop column "calculated_carbon_footprint";');
    this.addSql('alter table "ingridient" drop column "calculated_water_footprint";');
  }

}
