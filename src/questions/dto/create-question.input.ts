import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field()
  displayName: string;

  @Field()
  questionText: string;
}
