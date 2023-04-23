import { Migration } from '@mikro-orm/migrations';

export class Migration20230423030815 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "ingridient" alter column "weight" type int using ("weight"::int);');
    this.addSql('alter table "ingridient" alter column "weight" set default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ingridient" alter column "weight" drop default;');
    this.addSql('alter table "ingridient" alter column "weight" type int using ("weight"::int);');
  }

}
