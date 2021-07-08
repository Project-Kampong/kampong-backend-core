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
import { AuthService } from './auth.service';
import { UserLoginReqDto, UserLoginResDto } from './dto/userLogin.dto';
import { UserRegisterReqDto, UserRegisterResDto } from './dto/userRegister.dto';
import { JwtPayload, RequestWithUser } from './auth.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserLoginReqDto })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'User logged in',
    type: UserLoginResDto,
  })
  async userLogin(@Request() req: RequestWithUser): Promise<UserLoginResDto> {
    const { userId, username } = req.user;
    return this.authService.login(userId, username);
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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Decoded JWT payload: User ID and username',
    type: JwtPayload,
  })
  async getMe(
    @Request()
    req: RequestWithUser,
  ) {
    return req.user;
  }
}
