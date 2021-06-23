import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OrganizedEventsService } from './organized-events.service';
import { OrganizedEvent } from './schemas/organized-event.schema';
import { CreateOrganizedEventInput } from './dto/create-organized-event.input';
import { UpdateOrganizedEventInput } from './dto/update-organized-event.input';

@Resolver(() => OrganizedEvent)
export class OrganizedEventsResolver {
  constructor(
    private readonly organizedEventsService: OrganizedEventsService,
  ) {}

  @Mutation(() => OrganizedEvent)
  createOrganizedEvent(
    @Args('createOrganizedEventInput')
    createOrganizedEventInput: CreateOrganizedEventInput,
  ) {
    return this.organizedEventsService.create(createOrganizedEventInput);
  }

  @Query(() => [OrganizedEvent], { name: 'organizedEvents' })
  findAll() {
    return this.organizedEventsService.findAll();
  }

  @Query(() => OrganizedEvent, { name: 'organizedEvent' })
  findOne(@Args('_id', { type: () => ID }) organizedEventId: string) {
    return this.organizedEventsService.findOne(organizedEventId);
  }

  @Mutation(() => OrganizedEvent)
  updateOrganizedEvent(
    @Args('updateOrganizedEventInput')
    updateOrganizedEventInput: UpdateOrganizedEventInput,
  ) {
    return this.organizedEventsService.update(
      updateOrganizedEventInput._id,
      updateOrganizedEventInput,
    );
  }

  @Mutation(() => OrganizedEvent)
  removeOrganizedEvent(
    @Args('_id', { type: () => ID }) organizedEventId: string,
  ) {
    return this.organizedEventsService.remove(organizedEventId);
  }
}
