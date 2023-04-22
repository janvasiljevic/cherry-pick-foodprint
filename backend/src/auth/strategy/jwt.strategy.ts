import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractedUAT } from 'src/common/interfaces/tokens.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TODO',
    });
  }

  async validate(payload: any): Promise<ExtractedUAT> {
    return { userId: payload.sub, username: payload.username };
  }
}
