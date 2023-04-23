import { Migration } from '@mikro-orm/migrations';

export class Migration20230423023738 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipe" add column "link" varchar(255) null, add column "server_side_provided" boolean not null default false;');
    this.addSql('create index "recipe_link_index" on "recipe" ("link");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "recipe_link_index";');
    this.addSql('alter table "recipe" drop column "link";');
    this.addSql('alter table "recipe" drop column "server_side_provided";');
  }

}
