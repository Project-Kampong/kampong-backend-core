import { Module } from '@nestjs/common';
import { OrganizedEventsService } from './organized-events.service';
import { OrganizedEventsResolver } from './organized-events.resolver';

@Module({
  providers: [OrganizedEventsResolver, OrganizedEventsService]
})
export class OrganizedEventsModule {}
