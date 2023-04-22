import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { Recipe } from './Recipe.entity';
import { Source } from './Source.entity';

@Entity()
export class Ingridient extends CustomBaseEntity {
  @ManyToOne()
  recipe!: Recipe;

  @Property()
  name!: string;

  @Property()
  weight!: number;

  @ManyToOne()
  source?: Source; // not neccessary that ingridient has a source

  @Property({ nullable: true })
  calculated_carbon_footprint?: number;

  @Property({ nullable: true })
  calculated_water_footprint?: number;
}
