import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  userId: string;

  token: string;

  tokenExpiration: string;
}

export class UserRegisterReqDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class UserRegisterResDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  tokenExpiration: string;
}
