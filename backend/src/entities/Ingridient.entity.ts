import { Entity } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Ingridient extends CustomBaseEntity {}
