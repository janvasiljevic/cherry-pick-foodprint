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
  @Post('seed1')
  @Public()
  async seed1() {
    await this.devService.seed1();
  }

  @Post('seed2')
  @Public()
  async seed2() {
    await this.devService.seed2();
  }

  @Post('seed3')
  @Public()
  async seed3() {
    await this.devService.seed3();
  }
}
