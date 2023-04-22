import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerAuthDecorator } from 'src/common/decorators/openapi-auth.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/entities/User.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { RequestWithUAT } from 'src/common/interfaces/tokens.interface';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Register a new user',
  })
  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @SwaggerAuthDecorator
  @ApiOperation({ summary: 'Find all users or by search term' })
  findAll(@Query() searchUsersDto: SearchUsersDto): Promise<User[]> {
    return this.userService.findAll(searchUsersDto);
  }

  @SwaggerAuthDecorator
  @Get(':id')
  @ApiOperation({ summary: 'Find a given user by id' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @SwaggerAuthDecorator
  @Patch(':id')
  @ApiOperation({ summary: 'Update your profile' })
  update(
    @Request() { user }: RequestWithUAT,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user.userId, updateUserDto);
  }
}
