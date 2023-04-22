import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  Property,
  types,
} from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { Ingridient } from './Ingridient.entity';

@Entity()
export class Source extends CustomBaseEntity {
  @Property()
  food_group: string;

  @Property()
  food_item: string;

  @Property({ nullable: true, type: types.float })
  carbon_footprint?: number;

  @Enum({ items: () => Uncertainty, nullable: true })
  carbon_footprint_uncertainty?: Uncertainty;

  @Property({ nullable: true, type: types.float })
  water_footprint?: number;

  @Enum({ items: () => Uncertainty, nullable: true })
  water_footprint_uncertainty?: Uncertainty;

  @OneToMany(() => Ingridient, (ingridient) => ingridient.source)
  ingridients = new Collection<Ingridient>(this);
}

export enum Uncertainty {
  L = 'L',
  H = 'H',
}
