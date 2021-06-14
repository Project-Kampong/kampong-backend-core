import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  userId: string;

  token: string;

  tokenExpiration: string;
}

export class UserLoginReqDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class UserLoginResDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  tokenExpiration: string;
}
