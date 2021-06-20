import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Internal')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async list() {
    return this.usersService.list();
  }

  @Delete('/:userId')
  async deleteById(@Param('userId') userId: string) {
    return this.usersService.deleteUserById(userId);
  }
}
