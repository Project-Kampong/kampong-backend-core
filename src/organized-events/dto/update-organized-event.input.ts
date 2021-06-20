import { CreateOrganizedEventInput } from './create-organized-event.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizedEventInput extends PartialType(
  CreateOrganizedEventInput,
) {
  @Field(() => Int)
  id: number;
}
