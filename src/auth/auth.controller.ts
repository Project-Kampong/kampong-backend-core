import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import AuthService from './auth.service';
import { UserLoginReqDto, UserLoginResDto } from './dto/userLogin.dto';
import { UserRegisterReqDto, UserRegisterResDto } from './dto/userRegister.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserLoginReqDto })
  @ApiOkResponse({
    status: 200,
    description: 'User logged in',
    type: UserLoginResDto,
  })
  async userLogin(
    @Request() req: ExpressRequest & { user: UserLoginResDto },
  ): Promise<UserLoginResDto> {
    return req.user;
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
