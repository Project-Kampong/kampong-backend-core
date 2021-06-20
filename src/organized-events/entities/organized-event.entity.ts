import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OrganizedEvent {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
