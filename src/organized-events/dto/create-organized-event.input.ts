import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateOrganizedEventInput {
  @Field(() => String)
  eventName: string;
  @Field()
  startDate: Date;
  @Field({ nullable: true })
  endDate?: Date;
  @Field()
  description: string;
  @Field(() => ID, { description: `Organizer's user ID` })
  organizerId: string;
  @Field()
  category: string;
}
