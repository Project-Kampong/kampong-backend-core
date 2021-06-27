import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrganizedEventInput {
  @Field(() => String)
  @IsNotEmpty()
  eventName: string;
  @Field({ description: 'Start date in ISO8601 date string format' })
  @IsDateString()
  startDate: Date;
  @Field({ nullable: true })
  endDate?: Date;
  @Field()
  description: string;
  @Field(() => ID, { description: `Organizer's user ID` })
  @IsMongoId()
  organizerId: string;
  @Field()
  category: string;
}
