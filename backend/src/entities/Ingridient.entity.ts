import { Entity, ManyToOne, Property, types } from '@mikro-orm/core';
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
  weight = 0;

  @ManyToOne()
  source?: Source; // not neccessary that ingridient has a source

  @Property({ nullable: true, type: types.float })
  calculated_carbon_footprint?: number;

  @Property({ nullable: true, type: types.float })
  calculated_water_footprint?: number;
}
