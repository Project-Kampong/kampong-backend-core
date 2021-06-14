import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
