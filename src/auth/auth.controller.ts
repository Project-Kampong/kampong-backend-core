import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import AuthService from './auth.service';
import { UserLoginReqDto } from './dtos/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async userLogin(@Body() userLoginReqDto: UserLoginReqDto) {
    return this.authService.userLogin(
      userLoginReqDto.username,
      userLoginReqDto.password,
    );
  }
}
