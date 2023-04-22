import { PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

export abstract class CustomBaseEntity {
  @PrimaryKey()
  @ApiProperty()
  id: string = v4();

  @Property()
  @ApiProperty()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date();
}
