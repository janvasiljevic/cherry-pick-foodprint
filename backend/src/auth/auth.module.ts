import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/User.entity';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategy/local.auth';

@Module({
  imports: [
    UserModule,
    MikroOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      // Its a hackatkon :shrug:
      secret: 'secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
