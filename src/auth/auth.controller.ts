import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import AuthService from './auth.service';
import { UserLoginReqDto, UserLoginResDto } from './dto/userLogin.dto';
import { UserRegisterReqDto, UserRegisterResDto } from './dto/userRegister.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: 200,
    description: 'User logged in',
    type: UserLoginResDto,
  })
  async userLogin(
    @Body() userLoginReqDto: UserLoginReqDto,
  ): Promise<UserLoginResDto> {
    return this.authService.validateUser(
      userLoginReqDto.username,
      userLoginReqDto.password,
    );
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'User registered',
    type: UserRegisterResDto,
  })
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
