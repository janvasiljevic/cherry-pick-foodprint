import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsAlphanumeric, IsArray, IsString, MinLength } from 'class-validator';
import { Express } from 'express';

export class CreateIngridientDto {
  @ApiProperty()
  @IsAlphanumeric()
  name: string;

  @ApiProperty()
  weight: number;
}
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
  @ApiProperty({ type: [CreateIngridientDto] })
  @Type(() => CreateIngridientDto)
  @Transform(({ value }) => value.split(','))
  ingredientIds: CreateIngridientDto[];
}
