import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestWithUAT } from 'src/common/interfaces/tokens.interface';
import { TimelineGet } from './dto/timeline.dto';
import { Recipe } from 'src/entities/Recipe.entity';

@Controller('recipe')
@ApiTags('Recipes')
@ApiBearerAuth('JWT-auth') //edit here
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new recipe - WIP' })
  create(
    @Request() { user: at }: RequestWithUAT,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return this.recipeService.create(createRecipeDto, at.userId);
  }

  @Get('timeline')
  @ApiOperation({ summary: 'Get timeline - WIP' })
  timeline(
    @Request() { user }: RequestWithUAT,
    @Query() timelineGet: TimelineGet,
  ) {
    return this.recipeService.timeline(user.userId, timelineGet);
  }

  @Get('search')
  @ApiOperation({ summary: 'This will be the fancy AI Search - TODO' })
  search() {
    return this.recipeService.search();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a recipe by id' })
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a recipe by id - WIP' })
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a recipe by id' })
  remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }
}
