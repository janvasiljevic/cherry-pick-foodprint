import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsAlphanumeric, IsArray, IsString, MinLength } from 'class-validator';
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

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  ingredientIds?: string[];
}
