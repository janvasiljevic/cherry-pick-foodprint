import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevController } from './dev.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Source } from 'src/entities/Source.entity';
import { Ingridient } from 'src/entities/Ingridient.entity';
import { Recipe } from 'src/entities/Recipe.entity';
import { SourceModule } from 'src/source/source.module';

@Module({
  imports: [
    SourceModule,
    MikroOrmModule.forFeature([Source, Ingridient, Recipe]),
  ],
  providers: [DevService],
  controllers: [DevController],
})
export class DevModule {}
