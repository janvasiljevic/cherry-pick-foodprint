import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Collection, EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { Recipe } from 'src/entities/Recipe.entity';
import { TimelineGet } from './dto/timeline.dto';
import { Ingridient } from 'src/entities/Ingridient.entity';
import { Source } from 'src/entities/Source.entity';
import { SourceService } from 'src/source/source.service';
import { EntityManager } from '@mikro-orm/postgresql';
import weaviate, { WeaviateClient } from 'weaviate-ts-client';

@Injectable()
export class RecipeService {
  private readonly recipeRepository: EntityRepository<Recipe>;
  private readonly userRepository: EntityRepository<User>;
  private readonly ingridientRepository: EntityRepository<Ingridient>;
  private readonly logger = new Logger(RecipeService.name);
  private readonly sourceService: SourceService;

  private readonly em: EntityManager;
  constructor(
    @InjectRepository(Recipe) recipeRepository: EntityRepository<Recipe>,
    @InjectRepository(User) userRepository: EntityRepository<User>,
    @InjectRepository(Ingridient)
    ingridientRepository: EntityRepository<Ingridient>,
    sourceRepository: SourceService,
    em: EntityManager,
  ) {
    this.recipeRepository = recipeRepository;
    this.userRepository = userRepository;
    this.ingridientRepository = ingridientRepository;
    this.sourceService = sourceRepository;
    this.em = em;
  }
  client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
  });

  async create(createRecipeDto: CreateRecipeDto, userId: string) {
    const author = await this.userRepository.findOne({ id: userId });

    if (!author) throw new Error('User not found');

    const recipe = this.em.create(
      Recipe,
      {
        name: createRecipeDto.name,
        author: author,
        description: createRecipeDto.description,
        ingridients: createRecipeDto.ingredients.map((ingridient) =>
          this.em.create(Ingridient, {
            name: ingridient.name,
            weight: ingridient.weight,
          }),
        ),
      },
      { persist: true },
    );

    for (const ingridient of recipe.ingridients) {
      await this.sourceService.matchIngridient(ingridient);
    }

    recipe.calculate_carbon_footprint = 0;
    recipe.calculate_water_footprint = 0;

    for (const ingridient of recipe.ingridients) {
      if (ingridient.calculated_carbon_footprint)
        recipe.calculate_carbon_footprint +=
          ingridient.calculated_carbon_footprint;
      if (ingridient.calculated_water_footprint)
        recipe.calculate_water_footprint +=
          ingridient.calculated_water_footprint;
    }

    await this.em.flush();

    return recipe;
  }

  async timeline(userId: string, timelineGet: TimelineGet): Promise<Recipe[]> {
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
  async search(text: string): Promise<Recipe[]> {
    interface Pokedex {
      data: Data;
    }

    interface Data {
      Get: Get;
    }

    interface Get {
      Recipe: Recipe2[];
    }

    interface Recipe2 {
      description: string;
      name: string;
      url: string;
    }
    const m: Pokedex | void = await this.client.graphql
      .get()
      .withClassName('Recipe')
      .withFields('name description url')
      .withNearText({ concepts: [text] })
      .withLimit(30)
      .do()
      .catch((err: Error) => {
        console.error(err);
      });

    if (!m) throw new Error('No results found');

    const arr = m.data.Get.Recipe.map((recipe) => recipe.url);

    console.log(arr);

    const recipes = await this.recipeRepository.find(
      {
        $and: [
          { link: { $in: arr } },
          { calculate_carbon_footprint: { $ne: 0 } },
        ],
      },
      {
        orderBy: { calculate_carbon_footprint: 'DESC' },
      },
    );

    return recipes;
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
