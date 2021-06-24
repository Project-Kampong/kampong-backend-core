import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { User } from 'src/users/schemas/user.schema';
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
    @Request() req: ExpressRequest & { user: User },
  ): Promise<UserLoginResDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'User registered',
    type: UserRegisterResDto,
  })
  async userRegister(
    @Body() userRegisterReqDto: UserRegisterReqDto,
  ): Promise<UserRegisterResDto> {
    return this.authService.register(
      userRegisterReqDto.username,
      userRegisterReqDto.email,
      userRegisterReqDto.password,
    );
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getMe(
    @Request()
    req: ExpressRequest & { user: { username: string; password: string } },
  ) {
    return req.user;
  }
}
