import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
export class LoginDto {
  @MinLength(4)
  @ApiProperty({ example: 'test' })
  username: string;

  @MinLength(8)
  @ApiProperty({ example: '12345678' })
  password: string;
}
