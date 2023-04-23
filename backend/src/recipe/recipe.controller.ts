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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateIngridientDto, CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RequestWithUAT } from 'src/common/interfaces/tokens.interface';
import { TimelineGet } from './dto/timeline.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { IMAGE_PATH } from 'src/common/constants/contants';
import path from 'path';
@Controller('recipe')
@Controller('recipe')
@ApiTags('Recipes')
@ApiBearerAuth('JWT-auth') //edit here
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new recipe - WIP' })

  //     storage: diskStorage({
  //       destination: function (req, file, cb) {
  //         cb(null, IMAGE_PATH);
  //       },
  //       filename: function (req, file, cb) {
  //         cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  //       },
  //     }),
  //   }),
  // )
  @ApiConsumes('multipart/form-data')
  create(
    @Request() { user: at }: RequestWithUAT,
    @Body() createRecipeDto: CreateRecipeDto,
    // @UploadedFile() file: Express.Multer.File,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore_
    const ingr = createRecipeDto.ingredientIds as unkown as string;

    const tmp: CreateIngridientDto[] = JSON.parse('[' + ingr + ']');

    createRecipeDto.ingredientIds = tmp;

    console.log(createRecipeDto);

    return this.recipeService.create(createRecipeDto, at.userId, file.filename);
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

  @Post('bookmark/:id')
  @ApiOperation({ summary: 'Bookmark a recipe by id' })
  bookmark(@Request() { user }: RequestWithUAT, @Param('id') id: string) {
    return this.recipeService.bookmark(user.userId, id);
  }

  @Delete('bookmark/:id')
  @ApiOperation({ summary: 'Unbookmark a recipe by id' })
  unbookmark(@Request() { user }: RequestWithUAT, @Param('id') id: string) {
    return this.recipeService.unbookmark(user.userId, id);
  }
}
