import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  username: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    // checks that payload jwt (as in Bearer header) can be decoded into userId and username (ie. valid jwt)
    const { userId, username } = payload;
    return { userId, username };
  }
}
