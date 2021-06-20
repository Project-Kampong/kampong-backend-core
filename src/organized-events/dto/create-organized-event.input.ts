import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrganizedEventInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
