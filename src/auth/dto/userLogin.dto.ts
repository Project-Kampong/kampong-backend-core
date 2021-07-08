import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  userId: string;

  username: string;

  token: string;

  tokenExpiration: Date;
}

export class UserLoginReqDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UserLoginResDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  tokenExpiration: Date;
}
