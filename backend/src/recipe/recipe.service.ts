import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { Recipe } from 'src/entities/Recipe.entity';
import { TimelineGet } from './dto/timeline.dto';

@Injectable()
export class RecipeService {
  private readonly recipeRepository: EntityRepository<Recipe>;
  private readonly userRepository: EntityRepository<User>;

  private readonly logger = new Logger(RecipeService.name);

  constructor(
    @InjectRepository(Recipe) recipeRepository: EntityRepository<Recipe>,
    @InjectRepository(User) userRepository: EntityRepository<User>,
  ) {
    this.recipeRepository = recipeRepository;
    this.userRepository = userRepository;
  }

  async create(createRecipeDto: CreateRecipeDto, userId: string) {
    this.logger.debug('Finding author with id: ' + userId);
    const author = await this.userRepository.findOne({ id: userId });

    this.logger.debug('Finding author....');
    this.logger.debug(author);

    const recipe = new Recipe(
      createRecipeDto.name,
      createRecipeDto.description,
      author,
      [],
      [],
    );

    await this.recipeRepository.persist(recipe).flush();

    return recipe;
  }

  async timeline(userId: string, timelineGet: TimelineGet) {
    const user = await this.userRepository.findOne(
      { id: userId },
      { populate: ['followers'] },
    );

    if (!user) throw new Error('User not found');

    const followedIds = user.followers.getItems().map((user) => user.id);

    const recipes = await this.recipeRepository.find(
      {
        author: { $in: followedIds },
      },
      {
        limit: 10,
        orderBy: { createdAt: 'DESC' },
      },
    );

    return recipes;
  }

  // TODO - SEARCH
  search() {
    return `This action returns all recipe`;
  }

  async findOne(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne(
      { id },
      { populate: ['author', 'comments'] },
    );

    if (!recipe) throw new Error('Recipe not found');

    return recipe;
  }

  update(id: string, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  async remove(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ id });

    if (!recipe) throw new Error('Recipe not found');

    await this.recipeRepository.removeAndFlush(recipe);

    return recipe;
  }

  async bookmark(userId: string, recipeId: string) {
    const user = await this.userRepository.findOne(
      { id: userId },
      { populate: ['bookmarks'] },
    );
    const recipe = await this.recipeRepository.findOne({ id: recipeId });

    if (!user) throw new Error('User not found');
    if (!recipe) throw new Error('Recipe not found');

    if (user.bookmarks.contains(recipe))
      throw new BadRequestException('Recipe already bookmarked');

    user.bookmarks.add(recipe);

    await this.userRepository.persist(user).flush();

    return recipe;
  }

  async unbookmark(userId: string, recipeId: string) {
    const user = await this.userRepository.findOne(
      { id: userId },
      { populate: ['bookmarks'] },
    );
    const recipe = await this.recipeRepository.findOne({ id: recipeId });

    if (!user) throw new Error('User not found');
    if (!recipe) throw new Error('Recipe not found');

    if (!user.bookmarks.contains(recipe))
      throw new BadRequestException('Recipe not bookmarked');

    user.bookmarks.remove(recipe);

    await this.userRepository.persist(user).flush();

    return recipe;
  }
}
