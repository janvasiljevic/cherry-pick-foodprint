import { Entity, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Recipe extends CustomBaseEntity {
  @Property()
  name: string;

  @Property()
  description: string;
}
