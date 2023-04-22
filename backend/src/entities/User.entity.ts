import {
  ArrayType,
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { Comment } from './Comment.entity';
import { Recipe } from './Recipe.entity';

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

  // Twitter, GitHub (Links)
  @Property({ type: ArrayType, nullable: true })
  socials?: string[];

  // Comments the user has left
  @OneToMany(() => Comment, (comment) => comment.commentedBy, { lazy: true })
  comments = new Collection<Comment>(this);

  // The recipes user has created
  @OneToMany(() => Recipe, (recipe) => recipe.author, { lazy: true })
  recipes = new Collection<Recipe>(this);

  // The recipes user has bookmarked
  @ManyToMany(() => Recipe, (recipe) => recipe.bookmarkedBy, {
    lazy: true,
    owner: true,
  })
  bookmarks = new Collection<Recipe>(this);

  @ManyToMany(() => User)
  followers: Collection<User> = new Collection<User>(this);

  constructor(
    username: string,
    hashedPassword: string,
    firstName: string,
    lastName: string,
    socials: string[],
  ) {
    super();

    this.username = username;
    this.hashedPassword = hashedPassword;
    this.firstName = firstName;
    this.lastName = lastName;
    this.socials = socials;
  }
}
