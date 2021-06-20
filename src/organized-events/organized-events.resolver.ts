import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.organizedEventsService.findOne(id);
  }

  @Mutation(() => OrganizedEvent)
  updateOrganizedEvent(
    @Args('updateOrganizedEventInput')
    updateOrganizedEventInput: UpdateOrganizedEventInput,
  ) {
    return this.organizedEventsService.update(
      updateOrganizedEventInput.id,
      updateOrganizedEventInput,
    );
  }

  @Mutation(() => OrganizedEvent)
  removeOrganizedEvent(@Args('id', { type: () => Int }) id: number) {
    return this.organizedEventsService.remove(id);
  }
}
