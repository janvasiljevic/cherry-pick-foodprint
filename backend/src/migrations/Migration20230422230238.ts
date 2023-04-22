import { Migration } from '@mikro-orm/migrations';

export class Migration20230422230238 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipe" add column "image_url" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipe" drop column "image_url";');
  }

}
