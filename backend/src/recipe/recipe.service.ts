import { Injectable, Logger } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { Recipe } from 'src/entities/Recipe.entity';

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

  findAll() {
    return `This action returns all recipe`;
  }

  findOne(id: string) {
    return `This action returns a #${id} recipe`;
  }

  update(id: string, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: string) {
    return `This action removes a #${id} recipe`;
  }
}
