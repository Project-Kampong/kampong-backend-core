import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { isEmpty } from 'lodash';
import { OrganizedEventsService } from 'src/organized-events/organized-events.service';
import { OrganizedEvent } from 'src/organized-events/schemas/organized-event.schema';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly organizedEventsService: OrganizedEventsService,
    private readonly usersService: UsersService,
  ) {}

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

  @ResolveField('events', () => [OrganizedEvent])
  async findEventsByUserId(@Parent() user: User) {
    return this.organizedEventsService.findEventsByUserId(user._id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.updateUserById(
      updateUserInput._id,
      updateUserInput,
    );
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
