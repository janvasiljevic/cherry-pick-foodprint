import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Source } from 'src/entities/Source.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Source])],
  providers: [SourceService],
  controllers: [SourceController],
})
export class SourceModule {}
