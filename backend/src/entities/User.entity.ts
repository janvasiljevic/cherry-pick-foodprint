import { Entity, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class User extends CustomBaseEntity {
  @Property()
  @Unique()
  username: string;

  @Property({ lazy: true })
  hashedPassword: string;

  @Property()
  firstName?: string;

  @Property()
  lastName?: string;

  constructor(username: string, hashedPassword: string) {
    super();

    this.username = username;
    this.hashedPassword = hashedPassword;
  }
}
