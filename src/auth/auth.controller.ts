import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import AuthService from './auth.service';
import { UserLoginReqDto, UserLoginResDto } from './dtos/userLogin.dto';
import {
  UserRegisterReqDto,
  UserRegisterResDto,
} from './dtos/userRegister.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async userLogin(
    @Body() userLoginReqDto: UserLoginReqDto,
  ): Promise<UserLoginResDto> {
    return this.authService.userLogin(
      userLoginReqDto.username,
      userLoginReqDto.password,
    );
  }

  @Post('register')
  async userRegister(
    @Body() userRegisterReqDto: UserRegisterReqDto,
  ): Promise<UserRegisterResDto> {
    return this.authService.userRegister(
      userRegisterReqDto.username,
      userRegisterReqDto.email,
      userRegisterReqDto.password,
    );
  }
}
