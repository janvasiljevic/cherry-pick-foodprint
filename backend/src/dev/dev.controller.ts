import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { DevService } from './dev.service';

@Controller('dev')
@ApiTags('controller')
export class DevController {
  constructor(private readonly devService: DevService) {}

  @Post('seed')
  @Public()
  async seed() {
    await this.devService.seed();
  }
}
