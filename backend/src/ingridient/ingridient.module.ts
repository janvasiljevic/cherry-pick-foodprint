import { Module } from '@nestjs/common';
import { IngridientService } from './ingridient.service';
import { IngridientController } from './ingridient.controller';

@Module({
  controllers: [IngridientController],
  providers: [IngridientService]
})
export class IngridientModule {}
