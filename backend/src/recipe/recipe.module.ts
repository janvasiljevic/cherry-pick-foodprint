import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from 'src/entities/Recipe.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { Ingridient } from 'src/entities/Ingridient.entity';
import { SourceService } from 'src/source/source.service';
import { SourceMap } from 'module';
import { SourceModule } from 'src/source/source.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([User, Ingridient, Recipe]),
    SourceModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
