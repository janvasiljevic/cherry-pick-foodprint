import { Entity, Enum, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Recipe extends CustomBaseEntity {
  @Property()
  name: string;

  @Property()
  description: string;

  @Enum({ items: () => FoodTag, array: true, default: [] })
  foodTags: FoodTag[] = [];
}

export enum FoodTag {
  HIGH_PROTEIN = 'High protein',
  MEAT = 'Meat',
  FISH = 'Fish',
  LOW_GLYCEMIC_INDEX = 'Low glycemic index',
  RICH_IN_FIBER = 'Rich in fiber',
}
