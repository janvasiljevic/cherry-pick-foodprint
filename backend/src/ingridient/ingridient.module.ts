import { Module } from '@nestjs/common';
import { IngridientService } from './ingridient.service';
import { IngridientController } from './ingridient.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Ingridient } from 'src/entities/Ingridient.entity';
import { Source } from 'src/entities/Source.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Ingridient, Source])],
  controllers: [IngridientController],
  providers: [IngridientService],
})
export class IngridientModule {}
