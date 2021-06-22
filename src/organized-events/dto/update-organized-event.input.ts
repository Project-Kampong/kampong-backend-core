import { CreateOrganizedEventInput } from './create-organized-event.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizedEventInput extends PartialType(
  CreateOrganizedEventInput,
) {
  @Field(() => ID)
  _id: string;
}
