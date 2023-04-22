import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsArray, MinLength } from 'class-validator';
import { Express } from 'express';
export class CreateRecipeDto {
  @IsAlphanumeric()
  @MinLength(3)
  name: string;

  @MinLength(1)
  @IsAlphanumeric()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;

  @IsArray()
  ingredientIds: string[];
}
