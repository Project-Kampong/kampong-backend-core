import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateOrganizedEventInput {
  @Field(() => String)
  @IsNotEmpty()
  eventName: string;
  @Field({ description: 'Start date in ISO8601 date string format' })
  @IsDate()
  startDate: Date;
  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;
  @Field()
  description: string;
  @Field()
  category: string;
}
