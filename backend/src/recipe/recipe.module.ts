import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from 'src/entities/Recipe.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { Ingridient } from 'src/entities/Ingridient.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User, Ingridient, Recipe])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
