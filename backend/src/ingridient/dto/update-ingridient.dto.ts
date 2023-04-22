import { PartialType } from '@nestjs/swagger';
import { CreateIngridientDto } from './create-ingridient.dto';

export class UpdateIngridientDto extends PartialType(CreateIngridientDto) {}
