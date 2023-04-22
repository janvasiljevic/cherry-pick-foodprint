import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  private readonly userRepository: EntityRepository<User>;
  constructor(@InjectRepository(User) userRepository: EntityRepository<User>) {
    this.userRepository = userRepository;
  }

  async create({ username, password }: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = new User(username, hashedPassword, 'todo', 'todo', ['todo']);

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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
