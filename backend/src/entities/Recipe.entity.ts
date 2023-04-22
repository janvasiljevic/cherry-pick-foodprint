import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { Ingridient } from './Ingridient.entity';
import { Comment } from './Comment.entity';
import { User } from './User.entity';
@Entity()
export class Recipe extends CustomBaseEntity {
  @Property()
  name: string;

  @Property()
  description: string;

  @ManyToOne()
  author: User;

  @ManyToMany(() => User, (user) => user.bookmarks)
  bookmarkedBy: Collection<User> = new Collection<User>(this);

  @OneToMany(() => Ingridient, (ingridient) => ingridient.recipe)
  ingridients = new Collection<Ingridient>(this);

  // Food tags are calculated from ingridients (sources)
  @Enum({ items: () => FoodTag, array: true, default: [] })
  foodTags: FoodTag[] = [];

  // Carbon and water footprints are calculated from ingridients (sources)
  @Property({ nullable: true })
  calculate_carbon_footprint?: number;

  @Property({ nullable: true })
  calculate_water_footprint?: number;

  // Comments under the post made by other users
  @OneToMany(() => Comment, (comment) => comment.recipe)
  comments = new Collection<Comment>(this);
}

export enum FoodTag {
  HIGH_PROTEIN = 'High protein',
  MEAT = 'Meat',
  FISH = 'Fish',
  LOW_GLYCEMIC_INDEX = 'Low glycemic index',
  RICH_IN_FIBER = 'Rich in fiber',
}
