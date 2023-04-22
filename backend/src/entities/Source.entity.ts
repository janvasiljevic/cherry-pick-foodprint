import { Entity, Enum, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Source extends CustomBaseEntity {
  @Property()
  food_group: string;

  @Property()
  food_item: string;

  @Property()
  carbon_footprint: number;

  @Enum()
  carbon_footprint_uncertainty: Uncertainty;

  @Property()
  water_footprint: number;

  @Enum()
  water_footprint_uncertainty: Uncertainty;
}

export enum Uncertainty {
  LOW = 'low',
  HIGH = 'high',
}
