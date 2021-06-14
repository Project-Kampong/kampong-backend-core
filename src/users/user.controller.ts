import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import authService from './auth.service';
import { UserLoginDTO } from './dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class userController {
  constructor(private readonly AuthService: authService) {}

  @Post('login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    return this.AuthService.login(userLoginDTO);
  }
}
