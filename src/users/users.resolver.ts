import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import isEmpty from 'lodash';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => User)
  async findOneById(@Args('userId') userId: string) {
    const user = await this.usersService.findOneById(userId);
    if (isEmpty(user)) {
      throw new NotFoundException(`User with userId ${userId} does not exist`);
    }
    return user;
  }
}
