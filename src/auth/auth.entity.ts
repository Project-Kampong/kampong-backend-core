import { ApiProperty } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

export class JwtPayload {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  username: string;
}

export interface RequestWithUser extends ExpressRequest {
  user: JwtPayload;
}
