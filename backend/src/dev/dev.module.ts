import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevController } from './dev.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Source } from 'src/entities/Source.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Source])],
  providers: [DevService],
  controllers: [DevController],
})
export class DevModule {}
