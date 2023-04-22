import { IsAlphanumeric, IsArray, MinLength } from 'class-validator';
import { LoginDto } from 'src/auth/dto/login.dto';

export class CreateUserDto extends LoginDto {
  @MinLength(2)
  @IsAlphanumeric()
  firstName: string;

  @MinLength(2)
  @IsAlphanumeric()
  lastName: string;

  @IsArray()
  socials: string[];
}
