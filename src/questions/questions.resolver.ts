import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { Question } from './schemas/question.schema';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Mutation(() => [Question])
  createQuestion(
    @Args('organizedEventId', { type: () => ID }) organizedEventId: string,
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionsService.create(organizedEventId, createQuestionInput);
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionsService.update(
      updateQuestionInput._id,
      updateQuestionInput,
    );
  }

  @Mutation(() => Question)
  removeQuestion(@Args('_id', { type: () => ID }) questionId: string) {
    return this.questionsService.remove(questionId);
  }
}
