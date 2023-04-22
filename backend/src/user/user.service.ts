import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { EntityRepository, wrap } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { last } from 'rxjs';
import { SearchUsersDto } from './dto/search-users.dto';
@Injectable()
export class UserService {
  private readonly userRepository: EntityRepository<User>;
  constructor(@InjectRepository(User) userRepository: EntityRepository<User>) {
    this.userRepository = userRepository;
  }

  async create({
    username,
    password,
    firstName,
    lastName,
    socials,
  }: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = new User(
      username,
      hashedPassword,
      firstName,
      lastName,
      socials,
    );

    await this.userRepository.persist(user).flush();

    const { hashedPassword: _, ...returnValue } = user;

    return returnValue;
  }

  // Finds the given user by username
  // Used in the auth service, so it also returns the hashed password
  findOneByUsername(username: string) {
    return this.userRepository.findOne(
      { username },
      { populate: ['hashedPassword'] },
    );
  }

  async findAll(searchUsersDto: SearchUsersDto) {
    if (!searchUsersDto.search) return this.userRepository.findAll();

    return this.userRepository.find({
      $or: [
        { username: { $ilike: `%${searchUsersDto.search}%` } },
        { firstName: { $ilike: `%${searchUsersDto.search}%` } },
        { lastName: { $ilike: `%${searchUsersDto.search}%` } },
      ],
    });
  }

  findOne(id: string) {
    const user = this.userRepository.findOne(id, { populate: ['recipes'] });

    if (!user) throw new NotFoundException("Couldn't find user");

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ id });

    if (!user) throw new NotFoundException("Couldn't find user");

    wrap(user).assign(updateUserDto);

    await this.userRepository.persistAndFlush(user);

    return user;
  }
}
