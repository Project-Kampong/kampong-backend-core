import { CreateOrganizedEventInput } from './create-organized-event.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateOrganizedEventInput extends PartialType(
  CreateOrganizedEventInput,
) {
  @Field(() => ID)
  @IsMongoId()
  _id: string;
}
