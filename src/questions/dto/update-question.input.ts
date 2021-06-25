import { CreateQuestionInput } from './create-question.input';
import { InputType, Field, ID, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) {
  @Field(() => ID)
  _id: string;

  @Field(() => Int)
  voteCount: number;
}
