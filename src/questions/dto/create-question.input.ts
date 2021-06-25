import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field(() => ID)
  userId: string;

  @Field()
  questionText: string;
}
