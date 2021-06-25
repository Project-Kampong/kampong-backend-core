import { Module } from '@nestjs/common';
import { OrganizedEventsService } from './organized-events.service';
import { OrganizedEventsResolver } from './organized-events.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OrganizedEvent,
  OrganizedEventSchema,
} from './schemas/organized-event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrganizedEvent.name, schema: OrganizedEventSchema },
    ]),
  ],
  providers: [OrganizedEventsResolver, OrganizedEventsService],
  exports: [MongooseModule, OrganizedEventsService],
})
export class OrganizedEventsModule {}
