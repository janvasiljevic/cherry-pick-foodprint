import { User } from 'src/entities/User.entity';

export interface IUATPayload {
  username: string;
  sub: string;
}

export interface IUAT extends IUATPayload {
  iat: number;
  exp: number;
}

export interface ExtractedUAT {
  username: string;
  userId: string;
}

export interface RequestWithUAT extends Request {
  user: ExtractedUAT;
}
