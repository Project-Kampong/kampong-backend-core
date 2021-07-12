import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionInput {
  @Field(() => ID)
  _id: string;

  // TODO: Refactor as optional field. Current update method requires this field.
  @Field(() => Int)
  voteCount: number;

  // TODO: Refactor as optional field. Current update method requires this field.
  @Field()
  questionText: string;
}
