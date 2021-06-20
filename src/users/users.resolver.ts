import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { isEmpty } from 'lodash';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async list() {
    return this.usersService.list(true);
  }

  @Query(() => User, { name: 'user' })
  async findUserById(@Args('_id') userId: string) {
    const user = await this.usersService.findUserById(userId);
    if (isEmpty(user)) {
      throw new NotFoundException(`User with userId ${userId} does not exist`);
    }
    return user;
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUserById(@Args('_id') userId: string) {
    const user = await this.usersService.deleteUserById(userId);
    if (isEmpty(user)) {
      throw new NotFoundException(`User with userId ${userId} does not exist`);
    }
    return user;
  }
}
