import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './auth.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<JwtPayload> {
    const user = await this.authService.authenticateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(
        'Authentication failed. Please try again.',
      );
    }
    return { userId: user._id.toString(), username: user.username };
  }
}
