import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { User } from './User.entity';
import { Recipe } from './Recipe.entity';

@Entity()
export class Comment extends CustomBaseEntity {
  @ManyToOne()
  commentedBy: User;

  @ManyToOne()
  recipe: Recipe;

  @Property()
  text: string;

  @Property()
  downvotes: number;

  @Property()
  upvotes: number;
}
