import { ApiProperty } from '@nestjs/swagger';

export class UserLoginReqDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
