import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import authService from './auth.service';
import { userLoginDTO } from './model/user.model';

@ApiTags('user')
@Controller('auth')
export class userController {
  constructor(private readonly AuthService: authService) {}

  @Post('login')
  async login(@Body() userLoginDTO: userLoginDTO) {
    return this.AuthService.loginService(userLoginDTO);
  }
}
